var app = new angular.module('forgalminaplo', ['ngRoute', 'ngAnimate']);

app.run(function ($rootScope, $locale) {
    $locale.NUMBER_FORMATS.GROUP_SEP = '.';
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
    $rootScope.title = 'Forgalmi Napló';
    $rootScope.company = 'Bajai SZC Türr István Technikum';
    $rootScope.author = 'KKG SZR LA';

    if (sessionStorage.getItem('forgalminaploUser')) {
        $rootScope.loggedIn = true;
        $rootScope.loggedUser = angular.fromJson(sessionStorage.getItem('user'));
        $rootScope.loggedUserMail = angular.fromJson(sessionStorage.getItem('email'));
        $rootScope.loggedPermission = angular.fromJson(sessionStorage.getItem('permission'));
        $rootScope.loggedSchoolID = angular.fromJson(sessionStorage.getItem('schoolID'));
        $rootScope.studentTeacherID = angular.fromJson(sessionStorage.getItem('teacgerID'));
    } else {
        $rootScope.loggedIn = false;
        $rootScope.loggedUser = '';
        $rootScope.loggedUserMail = '';
        $rootScope.loggedPermission = '';
        $rootScope.loggedSchoolID = '';
        $rootScope.studentTeacherID = '';
    }
});

//TODO: rooting : Admin - felhasználók + kezelés, Tanár - diákok + naptár(összes foglaáls névvel), Diák - naptár(foglalható órák), saját statisztika
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'login.html',
        controller: 'loginCtrl',
    })
    .when('/teacherlist', {
        resolve: {
            function($location, $rootScope) {
                if (!$rootScope.loggedIn) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'teacherlist.html',
        controller: 'teacherCtrl'
    })
    .when('/studentslist',{
        resolve: {
            function($location, $rootScope) {
                if (!$rootScope.loggedIn) {
                    $location.path('/');
                }
            }
        },
        templateUrl: 'studentlist.html',
        controller: 'studentsCtrl'
    })
});
