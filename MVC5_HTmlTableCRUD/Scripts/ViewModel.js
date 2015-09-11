/// <reference path="../require.js" />
/// <reference path="../knockout-3.3.0.js" />


//Working Code
//define("knockout-3.3.0", function () {
//    return ko;
//});

//define("viewModel",["knockout-3.3.0"], function (ko) {
   
//    var viewModel = function () {
//        var self = this;
//        self.Message = ko.observable("This is Require.js");
//    };

//    return new viewModel();

//});
//Ends Here

//The model definition for jQuery and knockout dependencies
define("jquery", function () {
    return $;
});

define("knockout", function () {
    return ko;
}); 

//The viewModel definition
define("viewModel", ['jquery',"knockout"], function ($,ko) {

    var viewModel = function () {
        var self = this;
        //Boolean flag to check whether the current operation is for 
        //Edit and add  New Record
        var isNewRecord = false;
        self.Message = ko.observable();

        //Observable Array
        self.Employees = ko.observableArray([]);

        loadData();

        //Function to Load Data using WEB API
        function loadData() {
            $.ajax({
                url: "/api/EmployeeInfoAPI",
                type:"GET"
            }).done(function (resp) {
                self.Employees(resp);
            }).fail(function (err) {
                self.Message("Error " + err.status);
            });
        };

        //The Employee Object used for Add, Edit, Delete operations
        function Employee(eno, ename, dname, desig, sal) {
            return {
                EmpNo: ko.observable(eno),
                EmpName: ko.observable(ename),
                DeptName: ko.observable(dname),
                Designation: ko.observable(desig),
                Salary: ko.observable(sal)
            }
        };

        //Observables for Templates
        self.readonlyTemplate=ko.observable("readonlyTemplate"),
        self.editTemplate = ko.observable()

        //Function to set the Template      
        self.setCurrentTemplate = function (tmpl) {
            return tmpl === this.editTemplate() ? 'editTemplate' : this.readonlyTemplate();
        }.bind(self);

        //Function to cancel edit effect
        self.reset = function (t) {
            self.editTemplate("readonlyTemplate");
        };

        //Function to add a new Empty row in table
        self.addRecord = function () {
            self.Employees.push(new Employee(0, "", "", "", 0.0));
            isNewRecord = true; //Set the Check for the New Record
        };

        //Function to save record
        self.save = function (e) {
            var Emp = {}; 
            Emp.EmpNo=e.EmpNo;
            Emp.EmpName=e.EmpName;
            Emp.Salary=e.Salary;
            Emp.DeptName=e.DeptName;
            Emp.Designation = e.Designation;

            if (isNewRecord === false) {

                $.ajax({
                    type: "PUT",
                    url: "/api/EmployeeInfoAPI/" + e.EmpNo,
                    data: Emp})
                    .done(function (resp) {
                        self.Message("Record Updated Successfully ");
                        self.reset();
                    })
                    .fail(function (err) {
                        self.Message("Error Occures, Please Reload the Page and Try Again " + err.status);
                        self.reset();
                    });
            }

            if (isNewRecord === true) {
                isNewRecord = false;
                $.ajax({
                    type: "POST",
                    url: "/api/EmployeeInfoAPI",
                    data: Emp})
                    .done(function (resp) {
                        self.Message("Record Added Successfully ");
                        self.reset();
                        loadData();
                    }).fail(function (err) {
                        self.Message("Error Occures, Please Reload the Page and Try Again " + err.status);
                        self.reset();
                    });
            }
        };

        //Function to Delete the Record
        self.delete = function (d) {
             
            $.ajax({
                type: "DELETE",
                url: "/api/EmployeeInfoAPI/" + d.EmpNo})
                .done(function (resp) {
                    self.Message("Record Deleted Successfully " + resp.status);
                    self.reset();
                    loadData();
                })
                .fail(function (err) {
                    self.Message("Error Occures, Please Reload the Page and Try Again " + err.status);
                    self.reset();
                });
        };


    };

    return new viewModel();
});
