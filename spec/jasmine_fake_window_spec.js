describe("jasmine.fakeWindow", function() {
  var originalFakeWindow;

  it('should be defined', function() {
    expect(jasmine.fakeWindow).toBeDefined();
  });

  beforeEach(function() {
    originalFakeWindow = jasmine.fakeWindow;
  });

  afterEach(function() {
    jasmine.fakeWindow = originalFakeWindow;
  });

  describe("location", function() {
    it('is defined', function() {
      expect(jasmine.fakeWindow.location).toBeDefined();
    });

    it('cannot be overridden', function() {
      jasmine.fakeWindow.location = null;
      expect(jasmine.fakeWindow.location).toBeTruthy();
    });

    describe("href", function() {
      it('is defined', function() {
        expect(jasmine.fakeWindow.location.href).toBeDefined();
      });

      it('cannot be overridden', function() {
        jasmine.fakeWindow.location.href = 'http://www.fake2.com';
        expect(jasmine.fakeWindow.location.href).toEqual('http://www.fake2.com');
      });
    });

    describe("port", function() {
      it('returns a valid port', function() {
        expect(jasmine.fakeWindow.location.port).toBeFalsy();
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.port).toEqual('80');
      });

      it('can be changed, changing the href', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.port).toEqual("80");
        jasmine.fakeWindow.location.port = "3000";
        expect(jasmine.fakeWindow.location.port).toEqual("3000");
        expect(jasmine.fakeWindow.location.href).toEqual("http://local.fake.com:3000");
      });
    });

    describe("hostname", function() {
      it('is defined', function() {
        expect(jasmine.fakeWindow.location.hostname).toBeTruthy();
      });

      it('returns the parsed hostname (no port)', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.hostname).toEqual("local.fake.com");
      });

      it('can be changed, changing the href', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.hostname).toEqual("local.fake.com");
        jasmine.fakeWindow.location.hostname = 'www.google.com';
        expect(jasmine.fakeWindow.location.hostname).toEqual("www.google.com");
        expect(jasmine.fakeWindow.location.href).toEqual('http://www.google.com:80');
      });
    });

    describe("host", function() {
      it('returns the parsed host + port', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.host).toEqual("local.fake.com:80");
      });

      it('can be changed, changing the href', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.host).toEqual("local.fake.com:80");
        jasmine.fakeWindow.location.host = "local.fake2.com:3000";
        expect(jasmine.fakeWindow.location.host).toEqual("local.fake2.com:3000");
        expect(jasmine.fakeWindow.location.href).toEqual("http://local.fake2.com:3000");
      });
    });

    describe("hash", function() {
      it('returns the parsed hash', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80#foo";
        expect(jasmine.fakeWindow.location.hash).toEqual("#foo");
      });

      it('can be changed, changing the href', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80#foo";
        expect(jasmine.fakeWindow.location.hash).toEqual("#foo");
        jasmine.fakeWindow.location.hash = "#bar";
        expect(jasmine.fakeWindow.location.hash).toEqual("#bar");
        expect(jasmine.fakeWindow.location.href).toEqual("http://local.fake.com:80#bar");
      });
    });

    describe("origin", function() {
      it('returns the parsed origin', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80#foo";
        expect(jasmine.fakeWindow.location.origin).toEqual("http://local.fake.com:80");
      });

      it('can be set, changing the href', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80#foo";
        expect(jasmine.fakeWindow.location.origin).toEqual("http://local.fake.com:80");
        jasmine.fakeWindow.location.href = "http://local.fake2.com:80#foo";
        expect(jasmine.fakeWindow.location.origin).toEqual("http://local.fake2.com:80");
      });
    });

    describe("protocol", function() {
      it(' returns the protocol from the href', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.protocol).toEqual('http:');
        jasmine.fakeWindow.location.href = "https://local.fake.com:80";
        expect(jasmine.fakeWindow.location.protocol).toEqual('https:');
      });

      it('can be set', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80";
        expect(jasmine.fakeWindow.location.protocol).toEqual('http:');
        jasmine.fakeWindow.location.protocol = "https:";
        expect(jasmine.fakeWindow.location.protocol).toEqual('https:');
        expect(jasmine.fakeWindow.location.href).toEqual('https://local.fake.com:80');
      });
    });

    describe("search", function() {
      it('returns the query from the href', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80?foo=bar&baz=qux";
        expect(jasmine.fakeWindow.location.search).toEqual('?foo=bar&baz=qux');
      });

      it('can be set', function() {
        jasmine.fakeWindow.location.href = "http://local.fake.com:80?foo=bar&baz=qux";
        expect(jasmine.fakeWindow.location.search).toEqual('?foo=bar&baz=qux');
        jasmine.fakeWindow.location.search = "?a=b&c=d";
        expect(jasmine.fakeWindow.location.href).toEqual('http://local.fake.com:80?a=b&c=d');
        expect(jasmine.fakeWindow.location.search).toEqual('?a=b&c=d');
      });
    });

    describe("replace", function() {
      it('is a function', function() {
        expect(jasmine.fakeWindow.location.replace).toBeTruthy();
        expect(jasmine.fakeWindow.location.replace).toEqual(jasmine.any(Function));
      });
    });

    describe("reload", function() {
      it('is a function', function() {
        expect(jasmine.fakeWindow.location.reload).toBeTruthy();
        expect(jasmine.fakeWindow.location.reload).toEqual(jasmine.any(Function));
      });
    });
  });
});
