describe('docready', function(){

  describe('Permalinking functionality', function(){
    it('should load the users symptoms from the querystring', function(){
      var link = '/#/tool/checklist?load=%7B%22symptoms%22%3A%5B%7B%22title%22%3A%22I%20feel%20depressed%22%2C%22tags%22%3A%5B%22mood%22%5D%2C%22selected%22%3Atrue%7D%2C%7B%22title%22%3A%22I%20feel%20angry%22%2C%22tags%22%3A%5B%22significant%20events%22%5D%2C%22selected%22%3Atrue%7D%5D%7D';
      browser().navigateTo(link);
      expect(element('#checklist li').count()).toBe(2);
      element('a[rel=\'next\']', 'Next button').click();
      expect(element('a.permalink').attr('href')).toEqual(link);
    });
  });
});
