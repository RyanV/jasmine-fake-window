describe("jasmine.fakeWindow example", function() {
  var MyObjectNamespace;
  beforeEach(function() {
    MyObjectNamespace = {};
    MyObjectNamespace.window = jasmine.fakeWindow;
    MyObjectNamespace.Util = {
      href: function() {
        return MyObjectNamespace.window.location.href;
      }
    };
  });

  it("allows overriding of the fake window obj", function() {
    jasmine.fakeWindow.location.href = "http://foo.com";
    expect(MyObjectNamespace.Util.href()).toEqual("http://foo.com");
  });
});
