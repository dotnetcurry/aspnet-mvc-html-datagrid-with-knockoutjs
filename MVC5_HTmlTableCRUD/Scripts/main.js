/// <reference path="../require.js" />
/// <reference path="../knockout-3.3.0.js" />
/// <reference path="ViewModel.js" />

//require.config({
//    baseUrl: "",
//    paths: {
//        "jQuery": "Scripts/jquery-2.1.4",
//        "bootstrap": "/Scripts/lib/bootstrap.min",
//        "knockout": "Scripts/knockout-3.3.0.debug",
//        "text": "Scripts/text"
//    },
//    shim: {
//        "jQuery": {
//            exports: "$"
//        },
//        "bootstrap": { deps: ["jquery"] }
//    }
//});

//Working Code Below
//require(['knockout-3.3.0', 'viewModel'], function (ko, viewModel) {
    
//        alert("done");
//        //Instantiate page view model
//        ko.applyBindings(viewModel);
   
//});
//Ends Heres

//Define module loading for jQuey, knockout and view Model
require(['jquery','knockout', 'viewModel'], function ($,ko, viewModel) {
    $(document).ready(function () {

        //Instantiate page view model
        ko.applyBindings(viewModel);

    });
});