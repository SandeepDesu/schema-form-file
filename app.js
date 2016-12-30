/**
 * Created by engr on 12/28/2016.
 */
var myApp=angular.module('sandy',[
    'schemaForm','schemaFormFileOperations'
]);
myApp.controller('testingController',['$scope',function($scope){

    $scope.schema={
            type: 'object',
            properties: {
            name: {type: 'string', title: 'Employee Name'},
            startdate: {type: 'date', title: 'startdate',format: 'date'},
            "image":{type:'string',title:"Image file",pattern:{mimeType:'image/*',formate:"blob",show:'img',height:'200px',width:'500px'}},
            }
    }
    $scope.form=[{
        key: 'name',
        "fieldHtmlClass": "input-highlight",
        title: 'Name'

    },
        {
            key: 'startdate',
            "fieldHtmlClass": "input-highlight",
            title: 'date',
            type:"date"

        },
        {
            key: 'image',
            "fieldHtmlClass": "input-highlight",
            title: 'file',
            type:'tsFile'

        }];
    $scope.model={};
    $scope.submitForm=function(){
        console.log($scope.model);
    }
}])