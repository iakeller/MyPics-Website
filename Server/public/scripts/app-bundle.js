define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }, {
        route: 'image',
        moduleId: './modules/image',
        name: 'Image',
        auth: false
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/home'
  };

  exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', './auth-config', 'regenerator-runtime'], function (exports, _environment, _authConfig, _regeneratorRuntime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.title = "Your MyPics Galleries";
      this.users = users;
      this.message = '';
      this.showLogin = true;
    }

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";
      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.users.save(this.user);

              case 2:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Home;
  }()) || _class);
});
define('modules/image',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/images'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _images) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.image = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var image = exports.image = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _images.Images, _aureliaAuth.AuthService), _dec(_class = function () {
		function image(router, images, auth) {
			_classCallCheck(this, image);

			this.router = router;
			this.images = images;
			this.auth = auth;
			this.message = 'Image List';
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.showList = true;
			this.showForm = false;
			this.title = "You Have Some Images!";
			this.editTodoForm = false;
			this.showCompleted = false;
		}

		image.prototype.activate = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.images.getGalleryImages(JSON.parse(sessionStorage.getItem('gallery'))._id);

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function activate(_x) {
				return _ref.apply(this, arguments);
			}

			return activate;
		}();

		image.prototype.logout = function logout() {
			sessionStorage.removeItem('user');
			this.auth.logout();
		};

		image.prototype.createImage = function createImage() {
			this.imageObj = {
				galleryId: JSON.parse(sessionStorage.getItem('gallery'))._id

			};
			this.showList = false;
			this.showForm = true;
		};

		image.prototype.saveImage = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var response, galleryId, imageId;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!this.imageObj) {
									_context2.next = 16;
									break;
								}

								_context2.next = 3;
								return this.images.save(this.imageObj);

							case 3:
								response = _context2.sent;

								if (!response.error) {
									_context2.next = 8;
									break;
								}

								alert("There was an error creating the Image");
								_context2.next = 14;
								break;

							case 8:
								galleryId = JSON.parse(sessionStorage.getItem('gallery'))._id;
								imageId = response._id;

								if (!(this.filesToUpload && this.filesToUpload.length)) {
									_context2.next = 14;
									break;
								}

								_context2.next = 13;
								return this.images.uploadFile(this.filesToUpload, galleryId, imageId);

							case 13:
								this.filesToUpload = [];

							case 14:
								this.showList = true;
								this.showForm = false;

							case 16:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveImage() {
				return _ref2.apply(this, arguments);
			}

			return saveImage;
		}();

		image.prototype.backToList = function backToList() {
			this.router.navigate('list');
		};

		image.prototype.back = function back() {
			this.showList = true;
			this.showForm = false;
		};

		image.prototype.editImage = function editImage(image) {
			this.imageObj = image;
			this.showList = false;
			this.showForm = true;
		};

		image.prototype.deleteImage = function deleteImage(image) {
			this.images.deleteImage(image._id);
		};

		image.prototype.changeFiles = function changeFiles() {
			this.filesToUpload = new Array();
			this.filesToUpload.push(this.files[0]);
		};

		image.prototype.removeFile = function removeFile(index) {
			this.filesToUpload.splice(index, 1);
		};

		return image;
	}()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/galleries'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _galleries) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.List = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _galleries.Galleries, _aureliaAuth.AuthService), _dec(_class = function () {
		function List(router, galleries, auth) {
			_classCallCheck(this, List);

			this.router = router;
			this.galleries = galleries;
			this.auth = auth;
			this.message = 'Your MyPics Galleries';
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.showList = true;
			this.showForm = false;
			this.editTodoForm = false;
			this.showCompleted = false;
		}

		List.prototype.activate = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.galleries.getUserGalleries(this.user._id);

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function activate() {
				return _ref.apply(this, arguments);
			}

			return activate;
		}();

		List.prototype.logout = function logout() {
			sessionStorage.removeItem('user');
			this.auth.logout();
		};

		List.prototype.createGallery = function createGallery() {
			this.galleryObj = {
				gallery: "",
				description: "",
				userId: this.user._id
			};
			this.showList = false;
			this.showForm = true;
		};

		List.prototype.saveGallery = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!this.galleryObj) {
									_context2.next = 7;
									break;
								}

								_context2.next = 3;
								return this.galleries.save(this.galleryObj);

							case 3:
								response = _context2.sent;

								if (response.error) {
									alert("There was an error creating the Gallery");
								} else {}
								this.showList = true;
								this.showForm = false;

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveGallery() {
				return _ref2.apply(this, arguments);
			}

			return saveGallery;
		}();

		List.prototype.back = function back() {
			this.showList = true;
			this.showForm = false;
		};

		List.prototype.editGallery = function editGallery(gallery) {
			this.galleryObj = gallery;
			this.showList = false;
			this.showForm = true;
		};

		List.prototype.checkGallery = function checkGallery(gallery) {
			sessionStorage.setItem("gallery", JSON.stringify(gallery));
			this.router.navigate('image');
		};

		List.prototype.deleteGallery = function deleteGallery(gallery) {
			this.galleries.deleteGallery(gallery._id);
		};

		List.prototype.completeGallery = function completeGallery(gallery) {
			gallery.completed = !gallery.completed;
			this.galleryObj = gallery;
			this.saveGallery();
		};

		List.prototype.changeFiles = function changeFiles() {
			this.filesToUpload = new Array();
			this.filesToUpload.push(this.files[0]);
		};

		List.prototype.removeFile = function removeFile(index) {
			this.filesToUpload.splice(index, 1);
		};

		return List;
	}()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;
			this.BASE_URL = "http://localhost:5000/api/";
			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/galleries',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Galleries = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Galleries = exports.Galleries = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
		function Galleries(data) {
			_classCallCheck(this, Galleries);

			this.data = data;
			this.GALLERY_SERVICE = 'galleries';
			this.galleriesArray = [];
		}

		Galleries.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
				var serverResponse, _serverResponse;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!gallery) {
									_context.next = 13;
									break;
								}

								if (gallery._id) {
									_context.next = 9;
									break;
								}

								_context.next = 4;
								return this.data.post(gallery, this.GALLERY_SERVICE);

							case 4:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.galleriesArray.push(serverResponse);
								}
								return _context.abrupt('return', serverResponse);

							case 9:
								_context.next = 11;
								return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

							case 11:
								_serverResponse = _context.sent;
								return _context.abrupt('return', _serverResponse);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save(_x) {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		Galleries.prototype.getUserGalleries = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
				var response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.data.get(this.GALLERY_SERVICE + "/user/" + id);

							case 2:
								response = _context2.sent;

								if (!response.error && !response.message) {
									this.galleriesArray = response;
								}

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getUserGalleries(_x2) {
				return _ref2.apply(this, arguments);
			}

			return getUserGalleries;
		}();

		Galleries.prototype.deleteGallery = function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
				var response, i;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.data.delete(this.GALLERY_SERVICE + "/" + id);

							case 2:
								response = _context3.sent;

								if (!response.error) {
									for (i = 0; i < this.galleriesArray.length; i++) {
										if (this.galleriesArray[i]._id === id) {
											this.galleriesArray.splice(i, 1);
										}
									}
								}

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function deleteGallery(_x3) {
				return _ref3.apply(this, arguments);
			}

			return deleteGallery;
		}();

		return Galleries;
	}()) || _class);
});
define('resources/data/images',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Images = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Images = exports.Images = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
		function Images(data) {
			_classCallCheck(this, Images);

			this.data = data;
			this.IMAGE_SERVICE = 'images';
			this.imagesArray = [];
		}

		Images.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(image) {
				var serverResponse, _serverResponse;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!image) {
									_context.next = 13;
									break;
								}

								if (image._id) {
									_context.next = 9;
									break;
								}

								_context.next = 4;
								return this.data.post(image, this.IMAGE_SERVICE);

							case 4:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.imagesArray.push(serverResponse);
								}
								return _context.abrupt('return', serverResponse);

							case 9:
								_context.next = 11;
								return this.data.put(image, this.IMAGE_SERVICE + "/" + image._id);

							case 11:
								_serverResponse = _context.sent;
								return _context.abrupt('return', _serverResponse);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save(_x) {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		Images.prototype.uploadFile = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(files, galleryId, imageId) {
				var formData, response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								formData = new FormData();

								files.forEach(function (item, index) {
									formData.append("file" + index, item);
								});

								_context2.next = 4;
								return this.data.uploadFiles(formData, this.IMAGE_SERVICE + "/upload/" + galleryId + "/" + imageId);

							case 4:
								response = _context2.sent;

								console.log("this is being called " + this.IMAGE_SERVICE + "/upload/" + galleryId + "/" + imageId);
								return _context2.abrupt('return', response);

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function uploadFile(_x2, _x3, _x4) {
				return _ref2.apply(this, arguments);
			}

			return uploadFile;
		}();

		Images.prototype.getGalleryImages = function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
				var response;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.data.get(this.IMAGE_SERVICE + "/gallery/" + id);

							case 2:
								response = _context3.sent;

								if (!response.error && !response.message) {
									this.imagesArray = response;
								}

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function getGalleryImages(_x5) {
				return _ref3.apply(this, arguments);
			}

			return getGalleryImages;
		}();

		Images.prototype.deleteImage = function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
				var response, i;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.data.delete(this.IMAGE_SERVICE + "/" + id);

							case 2:
								response = _context4.sent;

								if (!response.error) {
									for (i = 0; i < this.imagesArray.length; i++) {
										if (this.imagesArray[i]._id === id) {
											this.imagesArray.splice(i, 1);
										}
									}
								}

							case 4:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function deleteImage(_x6) {
				return _ref4.apply(this, arguments);
			}

			return deleteImage;
		}();

		return Images;
	}()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Users(data) {
      _classCallCheck(this, Users);

      this.data = data;
      this.USER_SERVICE = 'users';
    }

    Users.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.data.post(user, this.USER_SERVICE);

              case 3:
                serverResponse = _context.sent;
                return _context.abrupt('return', serverResponse);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Users;
  }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompletedValueConverter = exports.CompletedValueConverter = function () {
    function CompletedValueConverter() {
      _classCallCheck(this, CompletedValueConverter);
    }

    CompletedValueConverter.prototype.toView = function toView(array, value) {
      if (!value) {
        return array.filter(function (item) {
          return !item.completed;
        });
      } else {
        return array;
      }
    };

    return CompletedValueConverter;
  }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      if (value === undefined || value === null) {
        return;
      }
      return (0, _moment2.default)(value).format('MMM Do YYYY');
    };

    return DateFormatValueConverter;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"resources/css/styles.css\"></require><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\n  margin-right: 10px;\n }\n .leftMargin {margin-right: 10px;}\n .centerMargin {margin-right: 10px;}\n"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>    <h1>${message}</h1>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!modules/image.html', ['module'], function(module) { module.exports = "<template>    <compose show.bind=\"showList\" show.bind=\"!showForm\" view=\"./components/imageList.html\"></compose>    <compose show.bind=\"!showList\" show.bind=\"showForm\" view=\"./components/imageForm.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template>    <compose show.bind=\"showList\" show.bind=\"!showForm\" view=\"./components/galleryList.html\"></compose>    <compose show.bind=\"!showList\" show.bind=\"showForm\" view=\"./components/galleryForm.html\"></compose></template>"; });
define('text!modules/components/galleryForm.html', ['module'], function(module) { module.exports = "<template><link href=\"../../resources/css/styles.css\" rel=\"stylesheet\"><center><button click.trigger=\"back()\" class=\"btn btn-primary btn-sm topMargin\"><div align=\"justify\">Back</div></button></center>&nbsp;<center><div class=\"card\" style=\"width:600px\"><div class=\"card-body\"><h4 class=\"card-title\">Create a MyPics Gallery</h4><div class=\"form-group col\"><div class=\"col-lg-6 col-lg-offset-6\"><table width=\"100%\" border=\"0\" cellpadding=\"6\"><tr><td><input value.bind=\"galleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter Gallery Name\"></td></tr></table><table width=\"100%\" border=\"0\" cellpadding=\"6\"><tr><td><textarea value.bind=\"galleryObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea></td></tr></table><table width=\"100%\" border=\"0\" cellpadding=\"6\"><tr><td><div align=\"center\"><button click.trigger=\"saveGallery()\" class=\"btn btn-primary btn-lg topMargin\">Save</button></div></td></tr></table></div></div></div></div></center></template>"; });
define('text!modules/components/galleryList.html', ['module'], function(module) { module.exports = "<template><table width=\"58%\" border=\"0\" cellpadding=\"6\"><tr><td><div align=\"left\"><h2>Your MyPics Gallery List</h2></div></td></tr></table><table width=\"58%\" border=\"0\" cellpadding=\"6\"><tr><td><div align=\"left\"><button type=\"button\" class=\"btn btn-primary .btn-md\" click.trigger=\"createGallery()\">Create a Gallery</button> &nbsp; <button type=\"button\" class=\"btn btn-info .btn-md\" click.trigger=\"logout()\">Logout</button></div></td></tr></table><center><div class=\"containter\"><div show.bind=\"galleries.galleriesArray.length\"></div><div class=\"table-responsive\"><table class=\"table\"><thead><tr><th>Gallery</th> <th>Description</th> <th>Edit | Delete</th></tr></thead><tbody><tr repeat.for=\"gallery of galleries.galleriesArray\"><th click.trigger=\"checkGallery(gallery)\">${gallery.gallery}</th><td>${gallery.description}</td><td>             <i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i>          </td></tr></tbody></table></div></div></center><div show.bind=\"!galleries.galleriesArray.length\">&nbsp; &nbsp;<center><table width=\"58%\" border=\"0\" cellpadding=\"6\"><tr><td><div align=\"left\"><h2>Cripes! You don't have any galleries :(</h2></div></td></tr></table></center></div>            </template>"; });
define('text!modules/components/imageForm.html', ['module'], function(module) { module.exports = "<template><center><h1 align=\"center\">Add a Photo</h1>&nbsp; &nbsp;<div align=\"center\"><table width=\"20%\" border=\"0\" cellpadding=\"6\"><tr><td width=\"50%\"><label class=\"btn btn-primary\">Browse Image <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label></td><td width=\"75%\"><button type=\"button\" class=\"btn btn-md\" click.trigger=\"back()\">Back to Gallery</button></td></tr></table><table align=\"center\" width=\"50%\" border=\"0\" cellpadding=\"6\"><tr><td width=\"200%\"><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"><button click.trigger=\"saveImage()\" class=\"btn btn-primary btn-sm topMargin\">Submit</button> ${file.name} <span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></td></tr></table></div></center></template>"; });
define('text!modules/components/imageList.html', ['module'], function(module) { module.exports = "<template><table width=\"58%\" border=\"0\" cellpadding=\"6\"><tr><td><div align=\"left\"><h2>Images in this Gallery</h2></div></td></tr></table><table width=\"58%\" border=\"0\" cellpadding=\"6\"><tr><td><div align=\"left\"><button type=\"button\" class=\"btn btn-primary .btn-md\" click.trigger=\"createImage()\">Add Image to Gallery</button> &nbsp; <button type=\"button\" class=\"btn btn-info .btn-md\" click.trigger=\"backToList()\">Back to Galleries</button></div></td></tr></table><div show.bind=\"images.imagesArray.length\"><div class=\"table-responsive\"><table class=\"table\"><thead><tr><th>Image</th></tr></thead><tbody><tr repeat.for=\"image of images.imagesArray\"><td><a href=\"uploads/${image.galleryId}/${image.file.fileName}\" target=\"_blank\"><img src=\"uploads/${image.galleryId}/${image.file.fileName}\" style=\"width:50px;height:50px\"></a>&nbsp;&nbsp;<button type=\"button\" class=\"btn btn-primary btn-sm\" click.trigger=\"editImage(image)\">Edit</button> &nbsp; <i click.trigger=\"deleteImage(image)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!images.imagesArray.length\"><h2>Cripes again! You don't have any pics :(</h2></div>        </div>    </template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><center><div class=\"card\" style=\"width:600px\"><div class=\"card-body\"><h4 class=\"card-title\">Login to MyPics</h4><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><div class=\"form-group col\"><div class=\"col-lg-6 col-lg-offset-6\">       <input value.bind=\"email\" type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\">    <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"><br><button type=\"button\" class=\"btn btn-primary\" click.trigger=\"login()\">Login</button>       <button type=\"button\" class=\"btn btn-link\" click.trigger=\"showRegister()\">Register</button></div></div></div>    </div></center></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><h1 align=\"center\">Register for a MyPics Account</h1><div align=\"center\"><table width=\"33%\" border=\"0\" cellpadding=\"6\"><tr><td width=\"33%\">First Name:</td><td width=\"67%\"><input value.bind=\"user.firstName\"></td></tr><tr><td>Last Name:</td><td><input value.bind=\"user.lastName\"></td></tr><tr><td>Email:</td><td><input value.bind=\"user.email\"></td></tr><tr><td>Password:</td><td><input value.bind=\"user.password\"></td></tr></table><button click.trigger=\"save()\" class=\"btn btn-primary topMargin\">Register</button></div></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map