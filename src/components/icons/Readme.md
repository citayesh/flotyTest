## Architecture & Implementation Notes

While a large-scale production application would typically configure `react-native-svg-transformer` to load raw `.svg` assets directly from an `assets/` folder, the vector graphics in this project have been intentionally structured as modular `.tsx` React components located within this directory. 

This approach was chosen for a combination of practical development needs and architectural flexibility:

* **Asset Sourcing & Integration:** Many of the icons used across the project were generated via AI tools or sourced externally. Converting them into functional React components provided the most reliable and immediate integration path without breaking the build pipeline.
* **Code-Level Manipulability:** Storing icons as `.tsx` files grants full programmatic control over styling, enabling instant adjustments to sizing, scaling, and dynamic color injection directly via component props (`width`, `height`, `color`).
* **Bundler Stability:** Avoiding third-party file transformers eliminates potential Metro bundler caching inconsistencies, version conflicts, and build friction during rapid iteration cycles.