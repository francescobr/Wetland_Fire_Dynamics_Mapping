// Script to obtain dynamics of burned areas of wetlands using a supervised classification
// on remote sensing images of the Harmonized Sentinel-2 Multi Spectral Instrument,
// Level-2A collection of the Sentinel-2 Copernicus European Space Agency mission.
// This version is intended for the following scientific publication:
// Bregoli, F.; Michailovsky, C.I.; Irvine, K. (2026) Mapping wetland fire dynamics with Sentinel-2 and UAV data in the papyrus-dominated Mara Wetland, Tanzania. Remote Sensing Applications: Society and Environment, 43, 102142. https://doi.org/10.1016/j.rsase.2026.102142.
// Date of this script: 22 October 2025.
// Author: Dr. Francesco Bregoli, f.bregoli@un-ihe.org
// Department of Water Resources and Ecosystems, 
// IHE Delft Institute for Water Education,
// Delft, the Netherlands


/* Step 0: IMPORTS */
 
 var wetland = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[33.91728628606803, -1.513502360906611],
          [33.915569672298496, -1.53100564188915],
          [33.91797293157584, -1.543017614871601],
          [33.92792929143912, -1.5419880198379634],
          [33.935825714778964, -1.535124040235035],
          [33.9543651434899, -1.540615225685069],
          [33.962261566829746, -1.5502247661338187],
          [33.97273290342021, -1.5507395854093464],
          [33.982517609310214, -1.5550295200185837],
          [33.996937183932474, -1.5469644337917037],
          [34.01204336614615, -1.5485087799591641],
          [34.03847921819693, -1.5522839477073462],
          [34.05358541936881, -1.5471359900190544],
          [34.0642284247399, -1.5388992317500392],
          [34.07075155706412, -1.5454200013447255],
          [34.08105123968131, -1.5505679632018978],
          [34.09581411809928, -1.5615502399318484],
          [34.1016505872128, -1.565840174717352],
          [34.10748709173209, -1.5742484258391813],
          [34.105942152854816, -1.5878044751782372],
          [34.10439718694693, -1.5986149978739992],
          [34.10714376897818, -1.602733263289708],
          [34.10542715520865, -1.610626582167809],
          [34.11023367376334, -1.6144016369188472],
          [34.11538351507193, -1.6109697692525975],
          [34.12396658391959, -1.6113129562795891],
          [34.13735617132193, -1.6109697692525975],
          [34.147999170693744, -1.6114845645102047],
          [34.15417898626334, -1.6161175685801814],
          [34.169285187435214, -1.6119993301600537],
          [34.17477836362753, -1.6075378966423408],
          [34.18095816106803, -1.6041060165887848],
          [34.19228781194693, -1.6034196400543252],
          [34.201900863306186, -1.6011889151805698],
          [34.20430410833365, -1.59518310371607],
          [34.21271551028813, -1.590893249281479],
          [34.223186859798496, -1.597585430228436],
          [34.23005331487662, -1.589348870516208],
          [34.225933441829746, -1.5787099322883615],
          [34.23863638372428, -1.5742484258391813],
          [34.24859274358756, -1.5495383718307707],
          [34.24927938909537, -1.5354672397393807],
          [34.26335562200553, -1.5265440347531756],
          [34.27708853216178, -1.5275736372227084],
          [34.28292501897818, -1.5227688214822996],
          [34.2894481513024, -1.5107567353428883],
          [34.29597128362662, -1.4977149666351226],
          [34.302837738704746, -1.4877619856289328],
          [34.308330902767246, -1.4839867052083289],
          [34.31348074407584, -1.4815842506752273],
          [34.32034720451495, -1.475749717447205],
          [34.32893026800162, -1.4726608253457916],
          [34.33064688177115, -1.465110206767275],
          [34.32515371770865, -1.453784231221872],
          [34.31039083929068, -1.4469199759368858],
          [34.29425466985709, -1.4503521061820333],
          [34.28258169622428, -1.4579027743813122],
          [34.27468527288443, -1.4661398380749606],
          [34.25545919866568, -1.4592756204278188],
          [34.23691980399939, -1.4664831211995366],
          [34.22078360052115, -1.4712879875031186],
          [34.19589277145176, -1.4798683654094584],
          [34.15246237249381, -1.485359535198683],
          [34.106457338037536, -1.498230210435072],
          [34.05598867864615, -1.5097271248615258],
          [34.04774891816603, -1.5050938904195972],
          [34.0367626044274, -1.5032062471692256],
          [33.98457754583365, -1.5183071972744435],
          [33.975994476985996, -1.513502360906611],
          [33.96432150335318, -1.510413531903306],
          [33.95642508001334, -1.5001174035649483],
          [33.9543651434899, -1.4815842506752273],
          [33.94543875188834, -1.4743768714598566],
          [33.926556000423496, -1.4736904531728818],
          [33.92037619085318, -1.4829570821563074],
          [33.924839386653964, -1.5032062471692256]]]),
    ROI = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[34.572651851837904, -1.6310688684143408],
          [34.58018849694477, -1.4086577382217933],
          [34.223991503436295, -1.4078228925800162],
          [34.12279718604789, -1.4650472336751927],
          [33.92203897166322, -1.4632289023215834],
          [33.925472210773464, -1.6334546799262617],
          [34.00173431549972, -1.6443225904501695],
          [34.080743099609826, -1.6579328356668157],
          [34.268974948984535, -1.6535687683740112]]]),
    wetlandregion = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[33.933841337890634, -1.4349188450683854],
          [33.933841337890634, -1.6463290917806686],
          [34.505130400390634, -1.6463290917806686],
          [34.505130400390634, -1.4349188450683854]]], null, false),
    Burned_areas_classes_UAV_S2_20230307 = ee.FeatureCollection("projects/mara-wetland-analyses-2024/assets/Burned_areas_classes_UAV-S2_20230307"),
    Validation_areas_from_sentinel_20190226 = ee.FeatureCollection("projects/mara-wetland-analyses-2024/assets/Validation_areas_from_sentinel_20190226"),
    UAV_orthoph_outlines = ee.FeatureCollection("projects/mara-wetland-analyses-2024/assets/UAV202302-03_Mara_ortophotomaps_outline_polygons");
    
var fc = ee.FeatureCollection([wetland]);
Map.centerObject(ROI, 10);

// Import geetools
var tools = require('users/fitoprincipe/geetools:tools');

/* STEP 1: Load image collection and filter date and region */
  // The new S2_HARMONIZED collection has interval 2015-06-27 to 2024-07-16, however, there s not images before '2016-11-23', and there s not cloudness polygons band (QA60) after '2024-02-10'
  // Moreover, there are specific cloudy images that are not filtered out even with a strict cloud filter, therefore are here excluded ad-hoc
var S2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED')
    .filterDate('2016-11-23', '2024-02-10') 
    .filterBounds(ROI)
    .sort('system:time_start')
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',8)
    .filterMetadata('MGRS_TILE','equals','36MXD')
    .filter(ee.Filter.neq('system:index','20180402T074609_20180402T080351_T36MXD'))
    .filter(ee.Filter.neq('system:index','20190909T074611_20190909T080510_T36MXD'))
    .filter(ee.Filter.neq('system:index','20191103T075009_20191103T080339_T36MXD'))
    .filter(ee.Filter.neq('system:index','20190527T074619_20190527T080335_T36MXD'))
    .filter(ee.Filter.neq('system:index','20191128T075251_20191128T075606_T36MXD'))
    .filter(ee.Filter.neq('system:index','20170805T074939_20170805T080851_T36MXD')) 
    .filter(ee.Filter.neq('system:index','20181218T075329_20181218T080926_T36MXD'))
    .filter(ee.Filter.neq('system:index','20190303T074821_20190303T080235_T36MXD'))
    .filter(ee.Filter.neq('system:index','20180621T074609_20180621T080959_T36MXD'))
    .filter(ee.Filter.neq('system:index','20180721T074609_20180721T080317_T36MXD'))
    .filter(ee.Filter.neq('system:index','20180716T074611_20180716T080226_T36MXD'))
    .filter(ee.Filter.neq('system:index','20181128T075249_20181128T080926_T36MXD'))
    .filter(ee.Filter.neq('system:index','20190216T075009_20190216T080742_T36MXD'))
    .filter(ee.Filter.neq('system:index','20190201T075141_20190201T080139_T36MXD'))
    .filter(ee.Filter.neq('system:index','20180805T074611_20180805T080721_T36MXD'))
    .filter(ee.Filter.neq('system:index','20190914T074609_20190914T080026_T36MXD'))
    .filter(ee.Filter.neq('system:index','20190924T074639_20190924T080925_T36MXD'))
    .filter(ee.Filter.neq('system:index','20200501T074609_20200501T080518_T36MXD'))
    .filter(ee.Filter.neq('system:index','20220521T074609_20220521T080453_T36MXD'))
    .filter(ee.Filter.neq('system:index','20220710T074619_20220710T080458_T36MXD'))
    .filter(ee.Filter.neq('system:index','20230720T074621_20230720T080453_T36MXD'))
    .filter(ee.Filter.neq('system:index','20230131T075141_20230131T080449_T36MXD'))
    .filter(ee.Filter.neq('system:index','20230903T074619_20230903T080037_T36MXD'))
    .filter(ee.Filter.neq('system:index','20231212T075229_20231212T080454_T36MXD'))
   
/* STEP 2: Add elevation band to collection */
var dataset = ee.Image('JAXA/ALOS/AW3D30/V2_2');
var addElevation = function(image){
  var elevation = dataset.select('AVE_DSM');
  return image.addBands(elevation)
}
var S2 = S2.map(addElevation)

/* STEP 3: Mask clouds and apply cloud mask filter */
function maskclouds(image) {
  var qa = image.select('QA60');

  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
        .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

// Update mask and copy properties
  return ee.Image(image.updateMask(mask).divide(10000)).copyProperties(image, image.propertyNames());
}
// Apply cloud masking function
var masked = S2.map(maskclouds);

// ROI Cloud-mask filter
var maskCover = tools.image.maskCover(masked.first(), ROI)
// Mask cover property for all images 
var addMaskCover = function(img) {
  var maskCover = tools.image.maskCover(img, ROI)
  return img.set('MASK_COVER', maskCover)
}
var colWithMaskCover = masked.map(addMaskCover).sort('MASK_COVER')
 var colWithMaskCoverList = colWithMaskCover.toList(colWithMaskCover.size())
 
// // Print the selected images collection list 
// print('mask cover sorted',colWithMaskCoverList)

// Filter the collection by mask cover
var newFiltered = colWithMaskCover.filterMetadata('MASK_COVER', 'less_than', 5)
var S2masked = newFiltered

/* STEP 4: Create elevation mask and clip collection on a given elevation extent inside ROI*/
var eleThreshold = 1185; //m asl
var elevation = dataset.select('AVE_DSM');  
var S2maskedElevation = function(image) {
    return image.updateMask(elevation.lte(eleThreshold));};
var S2masked = S2masked.map(S2maskedElevation).map(function(image){return image.clip(wetland)});

/* STEP 5: select and prepare the training image*/
  // Define the date of the specific image for training
var trainingImage = ee.Image(S2masked
    .filterDate("2023-03-06", "2023-03-08")
    .filterBounds(wetlandregion)
    .first());
    
 //  Visualize training image.
// var visualize={'bands': ['B4', 'B3', 'B2'], min: 0, max: 0.4};
// Map.addLayer(trainingImage,visualize, 'training_image'); 

// Function to add NBR, NDVI and date and other bands to the training image
var addBands = function(image) {
  var nbr = image.normalizedDifference(['B8', 'B12']).rename('NBR');
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands([nbr, ndvi]);
};

// Prepare the training image with NBR and other additional bands
trainingImage = addBands(trainingImage);

//  Print properties of training image with NBR band.
//print(trainingImage)

/* STEP 6: prepare the training data (ground truth polygons based on UAV and observation) */
  //  Visualize training shapefile with a single color.

Map.addLayer(Burned_areas_classes_UAV_S2_20230307,{
  color: '#de2d26'
}, 'id (single color)');

// Prepare the training data
var trainingData = trainingImage.select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12', 'NBR','NDVI'])
                          .sampleRegions({
                            collection: Burned_areas_classes_UAV_S2_20230307, //the ground truth polygons
                            properties: ['class'], // Property name for the classes
                            scale: 10
                          });

/* STEP 7: train, apply and test the supervised classification */
  
  // Train a Random Forest classifier
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: trainingData,
  classProperty: 'class',
  inputProperties: ['B2', 'B3', 'B4', 'B8', 'B11', 'B12', 'NBR', 'NDVI']
});

  // Apply the classifier to the image collection and also add the date in a specific format
var classifiedCollection = S2masked.map(function(image) {
  image = addBands(image);
    return image.classify(classifier)
    .set('date', image.date().format('YYYY-MM-dd'));
});

   print('classified collection:', classifiedCollection);

  // Test: Get a confusion matrix representing resubstitution accuracy in the same training set.
var trainAccuracy = classifier.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracy);
print('Training overall accuracy: ', trainAccuracy.accuracy());

/* STEP 8: validate the supervised classification */

 // Validation: validation on an independent date image, with an indipendent ground truth dataset.
  //The selected image is 2019-02-26 (around 4 years before of the training set)  
  
  // Define the specific image for quantitative validation
var QuantitativeValidationImage = ee.Image(S2masked
    .filterDate("2019-02-25", "2019-02-27")
    .filterBounds(wetlandregion)
    .first());

    // // Visualize quantitative validation image.
Map.addLayer(QuantitativeValidationImage,visualize, 'Quantitative_Validation_image_2019-02-26');

var classifiedValidationImage = classifiedCollection.filter(ee.Filter.eq('date','2019-02-26')).first();

var validationData = classifiedValidationImage.sampleRegions({
  collection: Validation_areas_from_sentinel_20190226,
  properties: ['class'], // Property name for the classes
  scale: 10
});

// Error matrix and accuracy assessment
var validationAccuracy = validationData.errorMatrix('class', 'classification');
print('Validation Error Matrix:', validationAccuracy);
print('Validation Overall Accuracy:', validationAccuracy.accuracy());

/* STEP 9.1: calculate burned area for each time step and export in Drive */

  // Function to calculate burned area
var calculateBurnedArea = function(image) {
  var burned = image.eq(1); // Assuming burned class is labeled as 1
  var pixelArea = burned.multiply(ee.Image.pixelArea());
  var burnedArea = pixelArea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: wetland,
    scale: 10,
    maxPixels: 1e9
  }).get('classification');
  return ee.Feature(null, {
    'date': image.get('date'),
    'burned_area': burnedArea
  });
};

   // Calculate the burned area for each image in the collection
var burnedAreaTimeSeries = classifiedCollection.map(calculateBurnedArea);

  // Convert the results to a feature collection for export
var burnedAreaFeatures = burnedAreaTimeSeries.map(function(image) {
  return ee.Feature(null, {'date': image.get('date'), 'burned_area': image.get('burned_area')});
});

  // Export the results to Google Drive as a CSV file
Export.table.toDrive({
  collection: burnedAreaFeatures,
  description: 'BurnedAreaTimeSeries',
  folder: 'Mara_wetland_GEE',
  fileFormat: 'CSV',
  selectors: ['date', 'burned_area']
});

/* STEP 9.2: calculate papyrus area for each time step and export in Drive */

  // Function to calculate burned area
var calculatePapyrusArea = function(image) {
  var papyrus = image.eq(2); // Assuming papyrus class is labeled as 2
  var pixelArea = papyrus.multiply(ee.Image.pixelArea());
  var papyrusArea = pixelArea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: wetland,
    scale: 10,
    maxPixels: 1e9
  }).get('classification');
  return ee.Feature(null, {
    'date': image.get('date'),
    'papyrus_area': papyrusArea
  });
};

   // Calculate the burned area for each image in the collection
var papyrusAreaTimeSeries = classifiedCollection.map(calculatePapyrusArea);

  // Convert the results to a feature collection for export
var papyrusAreaFeatures = papyrusAreaTimeSeries.map(function(image) {
  return ee.Feature(null, {'date': image.get('date'), 'papyrus_area': image.get('papyrus_area')});
});

  // Export the results to Google Drive as a CSV file
Export.table.toDrive({
  collection: papyrusAreaFeatures,
  description: 'papyrusAreaTimeSeries',
  folder: 'Mara_wetland_GEE',
  fileFormat: 'CSV',
  selectors: ['date', 'papyrus_area']
});

/* STEP 9.3: calculate openwater area for each time step and export in Drive */

  // Function to calculate openwaters area
var calculateOpenwatersArea = function(image) {
  var openwaters = image.eq(3); // Assuming openwater class is labeled as 3
  var pixelArea = openwaters.multiply(ee.Image.pixelArea());
  var openwatersArea = pixelArea.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: wetland,
    scale: 10,
    maxPixels: 1e9
  }).get('classification');
  return ee.Feature(null, {
    'date': image.get('date'),
    'openwaters_area': openwatersArea
  });
};

   // Calculate the burned area for each image in the collection
var openwatersAreaTimeSeries = classifiedCollection.map(calculateOpenwatersArea);

  // Convert the results to a feature collection for export
var openwatersAreaFeatures = openwatersAreaTimeSeries.map(function(image) {
  return ee.Feature(null, {'date': image.get('date'), 'openwaters_area': image.get('openwaters_area')});
});

  // Export the results to Google Drive as a CSV file
Export.table.toDrive({
  collection: openwatersAreaFeatures,
  description: 'openwatersAreaTimeSeries',
    folder: 'Mara_wetland_GEE',
  fileFormat: 'CSV',
  selectors: ['date', 'openwaters_area']
});

/* STEP 10: calculate average NDVI in wetland for each time step and export table in Drive */
 
  // Function to add NDVI and date to the collection
var calculateNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');

  return image.addBands([ndvi]).set('date', image.date().format('YYYY-MM-dd'));
};

  // Apply the NDVI function to the collection
var S2masked_WithNDVI = S2masked.map(calculateNDVI);

// print('S2masked_WithNDVI collection', S2masked_WithNDVI)

  // Function to calculate average NDVI over the wetland 
  // by filtering out NDVI values <= 0.0, which are open water, bare lands and other
var calculateMeanNDVI = function(image) {
  var meanNDVI = image.select('NDVI').updateMask(image.select('NDVI').gt(0.0)).reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: wetland,
    scale: 10,
    maxPixels: 1e9
  }).get('NDVI');
  return ee.Feature(null, {
    'date': image.get('date'),
    'mean_NDVI': meanNDVI
  });
};

// Map the average NDVI over the S2_NDVI collection
var meanNDVICollectionTimeSeries = S2masked_WithNDVI.map(calculateMeanNDVI);

// Convert the results to a feature collection for export
var meanNDVIFeatures = meanNDVICollectionTimeSeries.map(function(image) {
  return ee.Feature(null, {'date': image.get('date'), 'mean_NDVI': image.get('mean_NDVI')});
});

// Export the results to Google Drive as a CSV file
Export.table.toDrive({
  collection: meanNDVIFeatures,
  description: 'MeanNDVI_S2',
  fileFormat: 'CSV',
  selectors: ['date', 'mean_NDVI']
});

/* STEP 11: display some further results for visual inspection */

    // Define the date of the specific image for visual validation
var VisualValidationImage = ee.Image(S2masked
    .filterDate("2023-09-12", "2023-09-14")
    .filterBounds(wetlandregion)
    .first());

  //  Visualize visual validation image.
Map.addLayer(VisualValidationImage,visualize, 'Visual_Validation_image_2023-09-13');

// Define the date of the specific image with the most burned area for visual validation
var MostBurnedValidationImage = ee.Image(S2masked
    .filterDate("2022-08-18", "2022-08-20")
    .filterBounds(wetlandregion)
    .first());

  //  Visualize visual validation image (most burned).
Map.addLayer(MostBurnedValidationImage,visualize, 'Most_burned_image_2022-08-19');
 
  // Display the classified image for the training date
Map.centerObject(ROI, 10);
var classifiedTrainingImage = classifiedCollection.filter(ee.Filter.eq('date','2023-03-07')).first();
Map.addLayer(classifiedTrainingImage, {min: 1, max: 4, palette: ['white', 'red']}, 'Classified Training Image');

// Display the first classified image on the map
// Map.addLayer(classifiedCollection.first(), {min: 1, max: 4, palette: ['white', 'red']}, 'Classified First Image');

// Display the visual validation classified image on the map
var classifiedImage2 = classifiedCollection.filter(ee.Filter.eq('date','2023-09-13')).first();
Map.addLayer(classifiedImage2, {min: 1, max: 4, palette: ['white', 'red']}, 'Classified 13 Sep 2023 Image');

// Display for visual validation the classified most burned image on the map (2022-08-19)
var classifiedImage3 = classifiedCollection.filter(ee.Filter.eq('date','2022-08-19')).first();
Map.addLayer(classifiedImage3, {min: 1, max: 4, palette: ['white', 'red']}, 'Classified 19 Aug 2022 Image (most burned)');

// Display the classified quantitative validation image on the map (2019-02-26)
Map.addLayer(classifiedValidationImage, {min: 1, max: 4, palette: ['white', 'red']}, 'Classified qualitative validation image 26 Feb 2019');

// Display the NDVI image of the training image (when we have UAV data) (2023-03-07)
var visualizeNDVI={'bands': ['NDVI'], min: -1, max: 1, palette: ['white', 'green']};
var NDVI_TrainingImage = S2masked_WithNDVI.filter(ee.Filter.eq('date','2023-03-07')).first();
Map.addLayer(NDVI_TrainingImage,visualizeNDVI, 'NDVI 07 Mar 2023 (training image)'); 

// Display the NDVI image of the most burned image on the map (2022-08-19)
// var visualizeNDVI={'bands': ['NDVI'], min: -1, max: 1, palette: ['white', 'green']};
var NDVI_MostBurnedImage = S2masked_WithNDVI.filter(ee.Filter.eq('date','2022-08-19')).first();
Map.addLayer(NDVI_MostBurnedImage,visualizeNDVI, 'NDVI 19 Aug 2022 Image (most burned)'); 

//Display the potential cloudy classified image on the map
//var classifiedTrainingImage2 = classifiedCollection.filter(ee.Filter.eq('date','2024-02-05')).first();
//Map.addLayer(classifiedTrainingImage2, {min: 1, max: 4, palette: ['white', 'red']}, 'Classified 5 Feb 2024 Image');

/* STEP 12: export some result maps in raster TIFF */

    //Export classified training image
Export.image.toDrive({
  image: classifiedTrainingImage,
  description: 'Classified_Training_Image',
  folder: 'Mara_wetland_GEE', // Change to desired folder
  fileNamePrefix: 'ClassifiedTrainingImage_20230307',
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

//Export classified quantitative validation image (2019-02-26)
Export.image.toDrive({
  image: classifiedValidationImage,
  description: 'classifiedValidationImage',
  folder: 'Mara_wetland_GEE', // Change to desired folder
  fileNamePrefix: 'classifiedValidationImage_20190226',
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

//Export classified most burned image (2022-08-19)
Export.image.toDrive({
  image: classifiedImage3,
  description: 'classifiedMostBurnedImage',
  folder: 'Mara_wetland_GEE', // Change to desired folder
  fileNamePrefix: 'classifiedMostBurnedImage_20220819',
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

//Export NDVI of the training image (when we have UAV data) (2023-03-07) (only NDVI band)

Export.image.toDrive({
  image: NDVI_TrainingImage.select('NDVI'),
  description: 'NDVI_TrainingImage',
  folder: 'Mara_wetland_GEE', // Change to desired folder
  fileNamePrefix: 'NDVI_TrainingImage_20230307',
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Export NDVI most burned image (2022-08-19) (only NDVI band)

Export.image.toDrive({
  image: NDVI_MostBurnedImage.select('NDVI'),
  description: 'NDVI_MostBurnedImage',
  folder: 'Mara_wetland_GEE', // Change to desired folder
  fileNamePrefix: 'NDVI_MostBurnedImage_20220819',
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

/* STEP 13: create a stratified points sample for validation */

    //Sampling the training image in the whole wetland
var test = classifiedTrainingImage.stratifiedSample({
  numPoints: 50, 
  classBand: 'classification',
  region: wetland,
  geometries: true
  });

Map.addLayer(test,{},'Validation Points');

Export.table.toDrive({
  collection: test,
  description: 'Sampling_50',
  folder: 'Mara_wetland_GEE', // Change to desired folder
  fileFormat: 'SHP',
});

var scale_sampling = classifiedTrainingImage.projection().nominalScale(); //being sure that the correct scale is used

  //Sampling the training image in the UAV orthophotomaps area to compare classification quality
var test = classifiedTrainingImage.stratifiedSample({
  numPoints: 50, 
  classBand: 'classification',
  scale: scale_sampling,
  region: UAV_orthoph_outlines,
  geometries: true
  });

Map.addLayer(test,{},'Validation Points in UAV flight areas');
print(test.aggregate_histogram('classification'));  // Count per class

Export.table.toDrive({
  collection: test,
  description: 'Sampling_50_in_UAV_areas',
  folder: 'Mara_wetland_GEE', // Change to desired folder
  fileFormat: 'SHP',
});

/* STEP 14: calculate frequency of occurrence of burned area */

  // Create a binary collection where pixels == 1 are 1, others are 0
var binaryCollection = classifiedCollection.map(function(img) {
  return img.eq(1).rename('Burned_cells'); 
});

  // Sum all the binary rasters — this gives count of BA occurrences per pixel
var sumImage = binaryCollection.sum().rename('Burned_cell_occurrence');

  // Count number of images in original collection
var number_of_images = binaryCollection.size();
  print('number of images:', number_of_images);

  // Compute frequency 
var frequency_burned = sumImage.divide(ee.Image.constant(number_of_images)).rename('frequency_burned');

// Set "near-zero" to 0
var rounded_frequency_burned = frequency_burned.where(frequency_burned.lt(1e-7), 0);  // tiny float cleanup


  // Round to 4 decimals
var rounded_frequency_burned = rounded_frequency_burned
  .multiply(10000)    // shift decimals
  .round()             // round to nearest integer
  .toInt16();          // store as integer (saves space, faster export) but remember to devide by 10000 to have frequency
  
 
 // Reproject to EPSG:32736 with desired pixel size (10 m)
var rounded_frequency_burned_reproj = rounded_frequency_burned.reproject({
  crs: 'EPSG:32736',
  scale: 10
});

//  Clip AFTER reproject (lighter operation)
var rounded_frequency_burned_reproj = rounded_frequency_burned_reproj.clip(wetland);

  // Visualize result frequency map coarser scale
Map.centerObject(binaryCollection.first());
Map.addLayer(rounded_frequency_burned_reproj.clip(wetland).reproject({
    crs: 'EPSG:32736', scale: 500}),
    {min: 0, max: 10000, palette: ['white', 'black']},
  'Frequency of burned');
  
  // Export burned area frequency to drive
Export.image.toDrive({
  image: rounded_frequency_burned_reproj,
  description: 'Frequency_of_burned_areas',
  folder: 'Mara_wetland_GEE',
  // region: wetland,
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF',
  formatOptions: { cloudOptimized: true }
});

 print('check_frequency:', rounded_frequency_burned_reproj);
 print('Native projection:', rounded_frequency_burned_reproj.projection());
print('Nominal scale (m):', rounded_frequency_burned_reproj.projection().nominalScale());
print('Data type:', rounded_frequency_burned_reproj.bandTypes());

/* STEP 15: calculate frequency of occurrence of papyrus area */

  // Create a binary collection where pixels == 2 are 1, others are 0
var papyrus_binaryCollection = classifiedCollection.map(function(img) {
  return img.eq(2).rename('Papyrus_cells'); 
});

  // Sum all the binary rasters — this gives count of papyrus occurrences per pixel
var PapyrusSumImage = papyrus_binaryCollection.sum().rename('Papyrus_cell_occurrence');

  // Compute frequency 
var frequency_papyrus = PapyrusSumImage.divide(ee.Image.constant(number_of_images)).rename('frequency_papyrus');

// Set "near-zero" to 0
var rounded_frequency_papyrus = frequency_papyrus.where(frequency_papyrus.lt(1e-7), 0);  // tiny float cleanup

  // Round to 4 decimals
var rounded_frequency_papyrus = rounded_frequency_papyrus
  .multiply(10000)    // shift decimals
  .round()             // round to nearest integer
  .toInt16();            // store as integer (saves space, faster export) but remember to devide by 10000 to have frequency
  
 // Reproject to EPSG:32736 with desired pixel size (10 m)
var rounded_frequency_papyrus_reproj = rounded_frequency_papyrus.reproject({
  crs: 'EPSG:32736',
  scale: 10
});

//  Clip AFTER reproject (lighter operation)
var rounded_frequency_papyrus_reproj = rounded_frequency_papyrus_reproj.clip(wetland);

  // Visualize result frequency map coarser scale
Map.centerObject(papyrus_binaryCollection.first());
Map.addLayer(rounded_frequency_papyrus_reproj.clip(wetland).reproject({
    crs: 'EPSG:32736', scale: 500}),
    {min: 0, max: 10000, palette: ['white', 'black']},
  'Frequency of papyrus');
  
  // Export papyus area frequency to drive
Export.image.toDrive({
  image: rounded_frequency_papyrus_reproj,
  description: 'Frequency_of_papyrus_areas',
  folder: 'Mara_wetland_GEE',
  // region: wetland,
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF',
  formatOptions: { cloudOptimized: true }
});

 print('check_frequency:', rounded_frequency_papyrus_reproj);
 print('Native projection:', rounded_frequency_papyrus_reproj.projection());
print('Nominal scale (m):', rounded_frequency_papyrus_reproj.projection().nominalScale());
print('Data type:', rounded_frequency_papyrus_reproj.bandTypes());


/* STEP 16: calculate frequency of occurrence of openwaters area */

  // Create a binary collection where pixels == 3 are 1, others are 0
var openwaters_binaryCollection = classifiedCollection.map(function(img) {
  return img.eq(3).rename('openwaters_cells'); 
});

  // Sum all the binary rasters — this gives count of openwaters occurrences per pixel
var openwatersSumImage = openwaters_binaryCollection.sum().rename('openwaters_cell_occurrence');

  // Compute frequency 
var frequency_openwaters = openwatersSumImage.divide(ee.Image.constant(number_of_images)).rename('frequency_openwaters');

// Set "near-zero" to 0
var rounded_frequency_openwaters = frequency_openwaters.where(frequency_openwaters.lt(1e-7), 0);  // tiny float cleanup

  // Round to 4 decimals
var rounded_frequency_openwaters = rounded_frequency_openwaters
  .multiply(10000)    // shift decimals
  .round()             // round to nearest integer
  .toInt16();            // store as integer (saves space, faster export) but remember to devide by 10000 to have frequency
  
 // Reproject to EPSG:32736 with desired pixel size (10 m)
var rounded_frequency_openwaters_reproj = rounded_frequency_openwaters.reproject({
  crs: 'EPSG:32736',
  scale: 10
});

//  Clip AFTER reproject (lighter operation)
var rounded_frequency_openwaters_reproj = rounded_frequency_openwaters_reproj.clip(wetland);

  // Visualize result frequency map coarser scale
Map.centerObject(openwaters_binaryCollection.first());
Map.addLayer(rounded_frequency_openwaters_reproj.clip(wetland).reproject({
    crs: 'EPSG:32736', scale: 500}),
    {min: 0, max: 10000, palette: ['white', 'black']},
  'Frequency of openwaters');
  
  // Export papyus area frequency to drive
Export.image.toDrive({
  image: rounded_frequency_openwaters_reproj,
  description: 'Frequency_of_openwaters_areas',
  folder: 'Mara_wetland_GEE',
  // region: wetland,
  scale: 10,
  crs: 'EPSG:32736',
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF',
  formatOptions: { cloudOptimized: true }
});

 print('check_frequency:', rounded_frequency_openwaters_reproj);
 print('Native projection:', rounded_frequency_openwaters_reproj.projection());
print('Nominal scale (m):', rounded_frequency_openwaters_reproj.projection().nominalScale());
print('Data type:', rounded_frequency_openwaters_reproj.bandTypes());