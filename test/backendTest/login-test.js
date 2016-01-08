describe('KLS',function(){
  beforeEach(function() {
    browser.get('http://localhost:1337');
  });
  it('Works',function(){
    it('should have a title',function(){
      expect(browser.getTitle()).toEqual('Kaos Latin Servers');
    })
  })
  it('register in system',function(){
      browser.setLocation('login');
  })
})
