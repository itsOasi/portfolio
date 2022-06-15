# Components

## Summary

A component represents an individual or collection of html elements. It can be a button, a
form, an entire section of a page, a custom feature developed from scratch, etc.

When the page first loads, the engine looks for a component entitled 'main' as a starting point.

## Component Types

### **Loaded Components**

Components can be loaded from files in the file system with:

``` component.load(comp_name) ```

This option gives a lot more flexibility as you can create powerful peices of code to add to your website and just load it in whenever you need it!

**Structure of a Loaded Component**

```
. = parent directory
/ = folder
- = file

.. root
. static
/ components
  / component_category
    / your_component
      - comp.html
      - script.js
      - your_component.md
      - file_name.svg
      - file_name2.png
      - file_name_etc.txt
```


 ### **Generated Components**
 
 They can also be generated with:

 ``` component.generate(tag, comp_name) ```

This option is good quickly displaying information and loading icons or scripts.

### Goals
- components downloadable