'use strict';

describe('Service: Products', function () {

  // load the controller's module
  beforeEach(module('meanshopApp'));

  var Product;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_Products_) {
    Products = _Products_;
  }));

  it('should do something', function () {
    expect(!!Products).to.be.true;
  });
});
