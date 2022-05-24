// data for the currently loaded exhibit
let exb_data;
let debug = true;
function wae_debug(message){
    debug ? console.log(message) : null;
}

async function load_text(path){
    let comp_data = await fetch(path)
        .then((response) => {
            return response.text();
        }).then(data => {
            return data;
        }).catch(error => {
            return "<h1> Could not load component </h1><p>${error}</p>"
        });
    return comp_data
}

async function set_image(comp_name, comp_body){
    comp_body.attr("src", )
}

async function load_json(path){
    let comp_data = await fetch(path)
        .then((response) => {
            return response.json();
        }).then(data => {
            return data;
        }).catch(error => {
            return "<h1> Could not load component </h1><p>${error}</p>"
        });
    return comp_data
}

async function configure_component(comp_name, comp_body){
    await get_component_children(comp_name, comp_body);
    await check_component_content(comp_name, comp_body);
    await check_component_tags(comp_name, comp_body);
}

// gets component from folder
async function load_component(comp_name){
    wae_debug("loading component: " + comp_name)
    // store current component in variable for easy referencing
    let comp_json = exb_data.components[comp_name];
    wae_debug("at: static/"+comp_json.folder);
    // load component files
    let comp_body = $(`<div id='${comp_json.id}' class='comp_body'></div>`);
    let comp_data = await load_text("static/components/"+comp_json.folder+"/comp.html");
    // return file data as html object to be added to the model
    let comp = $.parseHTML(comp_data);
    comp_body.append(comp);
    await configure_component(comp_name, comp_body);
    set_component_style(comp_name, comp_body);
    delete exb_data.components[comp_name];
    return comp_body;
}

async function load_script(comp_name, comp_body){
    // store current component in variable for easy referencing
    let comp_json = exb_data.components[comp_name];
    wae_debug("loading script at: static/components/"+comp_json.folder);
    // load script  
    let comp = $("<script></script>");
    let comp_data = await load_text("static/components/"+comp_json.folder+"/script.js");
    comp.text(comp_data);
    // add file to the component
    comp_body.append(comp);
}

async function load_svg(comp_name, comp_body){
    // store current component in variable for easy referencing
    let comp_json = exb_data.components[comp_name];
    wae_debug("loading vector graphics at: static/"+comp_json.folder);
    // load script  
    let comp = $("<div class='svg-container'></div>");
    let comp_data = await load_text("static/components/"+comp_json.folder+"/vector.svg");
    comp.text(comp_data);
    return comp
}

async function check_component_tags(comp_name, comp_body){
    // store current component in variable for easy referencing
    let comp_json = exb_data.components[comp_name];
    wae_debug("checking component tags")
    if (comp_json.tags){
        let tags = exb_data.components[comp_name].tags;
        for (tag in tags){
            switch (tags[tag]){
                case "script":
                    await load_script(comp_name, comp_body)
                    .then( data => {
                        comp_body.append(data);
                    });
                    break;
                case "hidden":
                    comp_body.css("hidden", "true");
                    break;
                case "svg":
                    comp.append(await load_svg(comp_name, comp_body));
                    break;
                case "bg_img":
                    comp_body.css("background-image", comp_json.folder+"bg"+comp_json.bg_img_type);
                    break;
            }
        }
    }
}

async function check_component_content(comp_name, comp_body){
    // store current component in variable for easy referencing
    let comp_json = exb_data.components[comp_name];
    wae_debug("configuring component content");
    if (comp_json.content){
        let content = exb_data.components[comp_name].content;
        for (element in content){
            wae_debug(`configuring ${element}`)
            wae_debug(`${content[element]}`)
            for (attribute in content.element){
                wae_debug(`setting ${element[attribute][0]} of ${element} to ${element[attribute][1]}`);
                $(`#${element}`).attr(`${element[attribute].key}`, `${element[attribute]}`);
            }
        }
    }
}


// generates component based on provided tag
async function generate_component(tag,  comp_name){
    wae_debug("generating component: " + comp_name);
    let comp_json = exb_data.components[comp_name];
    let comp_body = $(`${tag}`);
    comp_body.attr("id", `${comp_name}`);
    comp_body.addClass("box");
    comp_json = exb_data.components[comp_name];
    await configure_component(comp_name, comp_body);

    delete exb_data.components[comp_name];
    return comp_body;
}

async function get_component_children(comp_name, comp_body){
    wae_debug("getting children for "+ comp_name);
    let children = exb_data.components[comp_name].children;
    if (children){
        for (child_name in children){
            await load_component(children[child_name])
                .then( data => {
                    comp_body.append(data);
                });
        }
    }
}

// applies styling info from current exhibit to page
function set_component_style(comp_name, comp_body){
    let comp_json = exb_data.components[comp_name];
    for (key in comp_json.style){
        let value = comp_json.style[key];
        comp_body.css(`${key}`, `${value}`);
    }
}
// applies styling info from current exhibit to page
function set_exhibit_style(){
    let style_root = $(":root");
    for (key in exb_data.style){
        let value = exb_data.style[key];
        style_root.css(`${key}`, `${value}`);
    }
}
    
// applies metadata from current exhibit to page
function set_exhibit_meta(){
    for (key in exb_data.meta){
        let value = exb_data.meta[key];
        $(`meta[property=${key}]`).attr("components", value);
    }
}

async function load_exhibit(path, body, sandbox){
    // get result
    let exhibit = "";
    wae_debug(`loading exhibit: ${path}`);
    // get exhibit file
    exb_data = await load_json(`${path}.json`);
    // if not running in a sandboxed environment i.e. an exhibit viewer
    if (sandbox){
        body.parseHTML(await load_text("static/sandbox/index.html"));
    }else{
        $("#page_title").text(exb_data.meta.page_title);
        $(document).prop('title', exb_data.meta.tab_title);
    }
    // update the tab title and header text
    // create components
    for (comp in exb_data.components){
        comp_type = exb_data.components[comp].type;
        wae_debug("handling component: "+comp)
        switch (comp_type){
            case "component":
                await load_component(comp)
                    .then( data => {
                            body.append(data);
                    });
                break;
            case "vbox":
            case "hbox":
            case "gbox":
                await generate_component("<div>", comp)
                    .then( data => {
                        data.addClass(comp_type);
                        data.addClass("box");
                        body.append(data);
                    });
                    break;
            case "img":
                await generate_component("<img>", comp)
                    .then( data => {
                        data.addClass(comp_type);
                        body.append(data);
                    });
            default:
                break;
        }
    }
    set_exhibit_style();
}