'use strict';

describe('Controller: AdviceCtrl', function () {

  // load the controller's module
  beforeEach(module('docready'));

  var AdviceCtrl,
    scope,
    controller,
    $httpBackend,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, mocks, $location) {
    $httpBackend = _$httpBackend_;
    location = $location;
    mocks.registerMocks($httpBackend);
    scope = $rootScope.$new();
    controller = $controller;
    AdviceCtrl = $controller('AdviceCtrl', {
      $scope: scope
    });
  }));

  it('should attatch a list of topics to the scope', function () {
    $httpBackend.flush();
    expect(scope.topics.length).toBe(4);
  });

  it('should attatch a list of items to the scope', function () {
    $httpBackend.flush();
    expect(scope.items.length).toBe(4);
  });

  it('should activate the first topic by default', function(){
    $httpBackend.flush();
    expect(scope.activeTopic).toEqual(scope.topics[0]);
  });

  it('should provide a methiod to set an active topic', function(){
    $httpBackend.flush();
    scope.setActiveTopic(scope.topics[2]);
    expect(scope.activeTopic).toEqual(scope.topics[2]);
  });

  it('should respect the active topic set in routeParams', function(){
    var routeParams = {topic: 'topic-2'};
    AdviceCtrl = controller('AdviceCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    $httpBackend.flush();
    expect(scope.activeTopic.slug).toEqual('topic-2');
  });

  it('should respect the active item set in routeParams', function(){
    var routeParams = {item: 'item-3'};
    AdviceCtrl = controller('AdviceCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    $httpBackend.flush();
    expect(scope.activeItem.slug).toEqual('item-3');
  });

  it('should elevate the active item set in routeParams to the front of the items array', function(){
    var routeParams = {item: 'item-3'};
    AdviceCtrl = controller('AdviceCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    $httpBackend.flush();
    expect(scope.items[0].slug).toEqual('item-3');
  });

  it('should ignore a missing item set in routeParams', function(){
    var routeParams = {item: 'missing'};
    AdviceCtrl = controller('AdviceCtrl', {
      $scope: scope,
      $routeParams: routeParams
    });
    $httpBackend.flush();
    expect(scope.items[0].slug).toEqual('item-1');
  });


  it('should provide a setItem method which sets the item in the location search', function(){
    $httpBackend.flush();
    scope.setItem('test-slug');
    expect(location.search().item).toEqual('test-slug');
  });
});
