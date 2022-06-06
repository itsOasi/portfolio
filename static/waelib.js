// data for the currently loaded exhibit
let exb_data;
let exb_data_cache;
let comp_folder = "static/components/";
let debug = true;
function wae_debug(message){
    debug ? console.log(message) : null;
}

let load = {
    script: async function(comp_name, comp_body){
        // store current component in variable for easy referencing
        let comp_json = exb_data.components[comp_name];
        wae_debug("loading script at: "+comp_folder+comp_json.folder);
        // load script  
        let comp = $("<script></script>");
        let comp_data = await load.as_text(comp_folder+comp_json.folder+"/script.js");
        dom.set_text(comp_data, comp);
        // add file to the component
        comp_body.append(comp);
    },

    img: async function (comp_name, floc, comp_body){
        let comp_json = exb_data.components[comp_name];
        comp_body.attr("src", floc);
    },

    svg: async function (comp_name, comp_body, floc){
        // store current component in variable for easy referencing
        let comp_json = exb_data.components[comp_name];
        let comp_data;
        if (floc){
            wae_debug("loading vector graphics at: "+floc);
            comp_data = await this.as_text(floc);
            
        }else{
            wae_debug("loading vector graphics at: "+comp_json.folder);
            comp_data = await this.as_text(comp_folder+comp_json.folder+"/comp.svg");
        }
        // load script  
        comp_body.append(comp_data)
    },

    json: async function (path){
        let comp_data = await fetch(path)
            .then((response) => {
                return response.json();
            }).then(data => {
                return data;
            }).catch(error => {
                return "<h1> Could not load component </h1><p>${error}</p>"
            });
        return comp_data
    },

    as_text: async function (path){
        let comp_data = await fetch(path)
            .then((response) => {
                return response.text();
            }).then(data => {
                return data;
            }).catch(error => {
                return "<h1> Could not load component </h1><p>${error}</p>"
            });
        return comp_data
    },

    ext_script: async function (href, comp_body){
        let script = $("<script>");
        dom.set_attr("src", href, script);
        comp_body.append(script);
    }
}
    
let component = {
    load: async function(comp_name){
        wae_debug("loading component: " + comp_name)
        // store current component in variable for easy referencing
        let comp_json = exb_data.components[comp_name];
        wae_debug("from: "+comp_folder+comp_json.folder);
        // load component files
        let comp_body = $(`<div id='${comp_json.id}' class='comp_body'></div>`);
        let comp_data = await load.as_text(comp_folder+comp_json.folder+"/comp.html");
        // return file data as html object to be added to the model
        let comp = $.parseHTML(comp_data);
        comp_body.append(comp);
        await this.configure(comp_name, comp_body);
        // removes component from exhibit data
        delete exb_data.components[comp_name];
        return comp_body;
    },
    generate: async function(tag, comp_name){
        wae_debug("generating component: " + comp_name);
        // gets json data fro component
        let comp_json = exb_data.components[comp_name];
        // creates dom element with specified tag
        let comp_body = $(`${tag}`);
        // sets id of element
        dom.set_id(comp_json.id, comp_body)
        // configures component as usual
        await this.configure(comp_name, comp_body);
        // adds 'box' to classes
        dom.add_class("box", comp_body);
        // removes component from exhibit data
        delete exb_data.components[comp_name];
        return comp_body;
    },
    sort: async function(comp_name, doc_body){
        // sort components
        wae_debug("sorting "+comp_name);
        let comp_type = exb_data.components[comp_name].type;
        if (exb_data.components[comp_name].skip)
            return;
        switch (comp_type){
            case "component":
                await component.load(comp_name)
                    .then( comp_body => {
                            doc_body.append(comp_body);
                    });
                break;
            case "vbox":
            case "hbox":
            case "gbox":
                await component.generate("<div>", comp_name)
                    .then( comp_body => {
                        comp_body.addClass(comp_type);
                        comp_body.addClass("box");
                        doc_body.append(comp_body);
                    });
                break;
            case "img":
                await component.generate("<img>", comp_name)
                    .then( comp_body => {
                        let comp_json = exb_data.components[comp_name];
                        wae_debug(comp_json)
                        comp_body.addClass(comp_type);
                        doc_body.append(comp_body);
                    });
                break;
            case "svg":
                await component.generate("<div class='svg_container'>", comp_name)
                    .then( comp_body => {
                        comp_body.addClass(comp_type);
                        doc_body.append(comp_body);
                    });
                break;
            default:
                break;
        }
    },
    configure: async function(comp_name, comp_body){
        wae_debug(`configuring componenet: ${comp_name}`)
        await configure.style(comp_name, comp_body);
        await configure.children(comp_name, comp_body);
        await configure.tags(comp_name, comp_body);
        await configure.content(comp_name, comp_body);
    }
}

let configure = {
    content: async function(comp_name, comp_body){
        // store current component in variable for easy referencing
        wae_debug("setting component content for "+ comp_name);
        let comp_json = exb_data.components[comp_name];
        if (comp_json.content){
            let content = exb_data.components[comp_name].content;
            for (element in content){
                if (element == "remove"){
                    let c = comp_body.find(content[element]);
                    dom.remove(c);
                    continue;
                }
                wae_debug(`for ${element}`);
                if (content[element].text){
                    dom.set_text(content[element].text, comp_body.find(`${element}`));
                    continue;
                }
                if (content[element].src){
                    dom.set_src(comp_folder+content[element].src, comp_body.find(`${element}`));
                    continue;
                }
                if (content[element].x_src){
                    dom.set_src(content[element].x_src, comp_body.find(`${element}`));
                    continue;
                }
                dom.set_attr(element, content[element][0], comp_body.find(`${element}`));
            }
        }
    },

    // read children from exhibit file and creates them
    children: async function (comp_name, comp_body){
        wae_debug("generating component children for " + comp_name);
        let children = exb_data.components[comp_name].children;
        if (children){
            for (child_name in children){
                await component.sort(children[child_name], comp_body)
            }
        }
    },

    // applies styling info from current exhibit to page
    style: async function(comp_name, comp_body){
        wae_debug("configuring component style for " + comp_name);
        let comp_json = exb_data.components[comp_name];
        for (key in comp_json.style){
            let value = comp_json.style[key];
            wae_debug(`setting ${comp_name} ${key} to ${value}`)
            comp_body.css(`${key}`, `${value}`);
        }
    },

    // read from component tags and configure accordingly
    tags: async function (comp_name, comp_body){
        wae_debug("checking component tags for "+comp_name)
        // store current component in variable for easy referencing
        let comp_json = exb_data.components[comp_name];
        if (comp_json.tags){
            let tags = exb_data.components[comp_name].tags;
            for (tag in tags){
                switch (tags[tag]){
                    case "script":
                        await load.script(comp_name, comp_body)
                        .then( data => {    
                            comp_body.append(data);
                        });
                        break;
                    case "hidden":
                        comp_body.css("hidden", "true");
                        break;
                    case "svg":
                        await load.svg(comp_name, comp_body);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

let dom = {
    set_src: function (src, comp_body){
        comp_body.attr("src", src)
    },
    set_text: function (text, comp_body){
        wae_debug(`setting text of ${comp_body.attr("id")} to ${text}`)
        comp_body.text(text);
    },
    set_id: function (id, comp_body){
        comp_body.attr("id", id);
    },
    set_attr: function(attr, value, comp_body){
        comp_body.attr(`${attr}`, `${value}`);
    },
    add_class: function (cl, comp_body){
        comp_body.addClass(cl);
    },
    remove: function(comp_body){
        comp_body.remove()
    },
    add: async function(tag, comp_name){
        let comp = $(`${tag}`);
        dom.set_id(comp_name, comp);
        return comp;
    },
    add_stylesheet: function(href, comp_body){
        let comp = $("<link>");
        dom.set_attr("rel", "stylesheet", comp);
        dom.set_attr("rel", href, comp);
        comp_body.append(comp);
    },
    add_script: function(src, comp_body){
        let comp = $("<script>");
        dom.set_src(src, comp);
        return comp;
    },
    add_link: function(href, comp_body){
        let link = dom.add("<a>");
        dom.set_attr("href", href, link);
        comp_body.append(link);
    }
}

let exhibit = {
    load: async function (path, body, sandbox){
        if (!path){
            path = "home";
        }
        wae_debug(`loading exhibit: ${path}`);
        // get exhibit file
        exb_data = await load.json(`${path}.json`);
        // copies data to a separate cache for later use
        exb_data_cache = exb_data;
        // set styling info of the page
        this.style();
        // apply any extra styles and scripts
        this.add_extras(body)

        // load header if requested
        if (exb_data.components.header){
            wae_debug("loading header");
            await component.load("header")
                .then(header=>{
                    $("body").append(header);
                });
        }

        // if running in a sandboxed environment i.e. an exhibit viewer
        if (sandbox){
            // load the specified exhibit in an iframe
            body.parseHTML(await load_text("static/sandbox/index.html"));
        }else{
            // update the tab title and header text
            dom.set_text(exb_data.meta.page_title, $("#header_title"));
            this.meta()
        }

        // begin filling the page
        await component.sort("main", body);
        
    },

    // applies styling info from current exhibit to page
    style: function (){
        let style_root = $(":root");
        for (key in exb_data.style){
            let value = exb_data.style[key];
            style_root.css(`${key}`, `${value}`);
        }
    },
    
    // applies metadata from current exhibit to page
    meta: function(){
        for (key in exb_data.meta){
            if (key == "title"){
                $(document).prop('title', exb_data.meta.tab_title);
            }
            let value = exb_data.meta[key];
            $(`meta[property=${key}]`).attr("components", value);
        }
    },
    add_extras: function(body){
        let stylesheets = exb_data.relation.extras.stylesheets;
        let scripts = exb_data.relation.extras.scripts;
        for (sheet in stylesheets){
            dom.add_stylesheet(stylesheets[sheet], body);
        }
        for (script in scripts){
            dom.add_script(scripts[script], body);
        }
    }

}

