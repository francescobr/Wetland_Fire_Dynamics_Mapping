# Google Earth Engine script for mapping wetland fire dynamics

https://doi.org/10.5281/zenodo.22707990

## Overview
Wetlands are important habitats supporting aquatic and terrestrial ecosystem services. However, numerous human pressures lead to their degradation. 
A common pressure, though not widely reported, is burning of papyrus-dominated wetlands of sub-Saharan Africa. 
This can be a major disturbance for wetlands habitats, and the species they contain and ecosystem services they provide. 
While in-situ monitoring of burning is difficult because of the remoteness, remote sensing provides a promising alternative.
In this study, we train a random forest classifier to detect burned areas in Sentinel-2 imagery of the Mara Wetland, Tanzania.
UAV-borne high-resolution orthophotos were obtained during field missions and used for training and validation.
The random forest algorithm is extensively validated using a randomized stratified sampling strategy. 
This methodology can support the management and preservation of wetlands vegetation, habitats and ecosystems threatened by burning.

## Quick start (run in Google Earth Engine)
To inspect and run the code imediately, click the snapshot link  to Google Earth Engine below:
https://code.earthengine.google.com/1aa0815a7b9d44bd79dac7d5c122c936
*Note: You will need a free Google Earth Engine account to run this link.*

## This repository structure
* `scripts/`
  * `GEE_script_Mara_Wetland_Burned_areas_2026.js`: The main JavaScript file containing the GEE code.
* `data/`
  * `Burned_areas_classes_UAV_S2_20230307.geojson`: Classes for training (GEE asset).
  * `Validation_areas_Sentinel2_20190226.geojson`: Sentinel2 validation areas (GEE asset).
  * `UAV_orthoph_outlines.geojson`: UAV validation areas (GEE asset).
* `README.md`: This file.

## Datasets used
Sentinel-2 MSI: `COPERNICUS/S2_HARMONIZED`
Training polygons (assets) 

## How to use this code
If you want to run the code locally using the text file in this repository:
1. Open the `scripts/main_analysis.js` file and copy the text.
2. Go to your Google Earth Engine Code Editor.
3. Paste the code into a new script window and save the script.
4. Click Run.
5. Some text output will be written in the Console and the output files (tables, images) will be placed in "Tasks" to be downloaded into your Drive.

## Citations
**Bregoli, F.; Michailovsky, C.I.; Irvine, K. (2026)** Mapping wetland fire dynamics with Sentinel-2 and UAV data in the papyrus-dominated Mara Wetland, Tanzania. Remote Sensing Applications: Society and Environment, 43, 102142. https://doi.org/10.1016/j.rsase.2026.102142.

**Bregoli, F., & Michailovsky, C. (2026)**. Wetland_Fire_Dynamics_Mapping: v1.0.0 - Code for wetland fire dynamics mapping publication (Version v1.0.0) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.22707990

## License
This project is licensed under the **MIT License**. 
See the full [LICENSE] file in this repository for the legal text.
