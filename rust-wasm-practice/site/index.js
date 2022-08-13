const js = import("../pkg/rust_wasm_practice.js");
js.then(js => {
  js.greet("WebAssembly");
  console.log(js.add(1, 2));
});