'use strict';

describe('Directive: validateEquals', function () {
  var scope, compileAndDigest, sniffer;
  beforeEach(module('docready'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    compileAndDigest = function (inputHtml, scope) {
      var inputElm = angular.element(inputHtml);
      var formElm = angular.element('<form name="form"></form>');
      formElm.append(inputElm);
      $compile(formElm)(scope);
      scope.$digest();
      return formElm;
    };  
  }));

  beforeEach(inject(function ($sniffer) {
    sniffer = $sniffer;
  }));

  it('will invalidate an input whose model does not match the model supplied to the directive' , inject(function () {
    scope.email = "r@n.com";
    compileAndDigest(
      '<input name="email" ng-model="email"/><input name="confirm" ng-model="confirm" validate-equals="email"/>', 
      scope
    );
    expect(scope.form.confirm.$error).toEqual({equal: true}); 
    expect(scope.form.confirm.$valid).toBeFalsy();
  }));

  it('will validate an input whose model matches the model supplied to the directive' , inject(function () {
    scope.email = "r@n.com";
    scope.confirm = "r@n.com";
    compileAndDigest(
      '<input name="email" ng-model="email"/><input name="confirm" ng-model="confirm" validate-equals="email"/>', 
      scope
    );
    expect(scope.form.confirm.$error).toEqual({equal: false});
    expect(scope.form.confirm.$valid).toBeTruthy();    
  }));

  it('will change validation state as models change' , inject(function () {
    scope.email = "r@n.com";
    compileAndDigest(
      '<input name="email" ng-model="email"/><input name="confirm" ng-model="confirm" validate-equals="email"/>', 
      scope
    );
    expect(scope.form.confirm.$valid).toBeFalsy();
    scope.$apply('confirm = "r@n.com"');
    expect(scope.form.confirm.$valid).toBeTruthy();   
    scope.$apply('email = "r@n.co.uk"')
    expect(scope.form.confirm.$valid).toBeFalsy();
  }));

  it('will change validation state as input values change' , inject(function () {
    scope.email = "r@n.com";
    var input = compileAndDigest(
      '<input name="email" ng-model="email"/><input id="confirm" name="confirm" ng-model="confirm" validate-equals="email"/>', 
      scope
    ).find('#confirm')
    expect(scope.form.confirm.$valid).toBeFalsy();
    input.val('r@n.com');
    input.trigger((sniffer.hasEvent('input') ? 'input' : 'change'));
    expect(scope.form.confirm.$valid).toBeTruthy();
  }));


});