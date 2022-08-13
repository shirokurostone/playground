extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
    log(&format!("Hello, {}!", name));
    log_u32(name.len().try_into().unwrap());
}

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32{
    a + b
}