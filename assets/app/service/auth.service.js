"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Auth = (function () {
    function Auth(_http) {
        this._http = _http;
    }
    Auth.prototype.isAuthenticated = function () {
        return localStorage.getItem('auth_token');
    };
    Auth.prototype.login = function (credentials) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http
            .post('/auth/authenticate', JSON.stringify(credentials), { headers: headers })
            .subscribe(function (response) {
            var data = response.json();
            localStorage.setItem('auth_token', JSON.stringify(data));
            _this.currentUser = JSON.parse(localStorage.getItem('auth_token')).user;
        });
    };
    Auth.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.currentUser = null;
    };
    Auth.prototype.register = function (formData) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        localStorage.removeItem('auth_token');
        this._http
            .post('/auth/register', JSON.stringify(formData), { headers: headers })
            .subscribe(function (response) {
            var data = response.json();
            localStorage.setItem('auth_token', JSON.stringify(data));
        });
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map