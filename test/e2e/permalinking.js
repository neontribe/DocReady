describe('docready', function(){

  describe('Permalinking functionality', function(){
    it('should load the users symptoms from the querystring', function(){
      var link = '/#/tool/checklist?load=%7B%22symptoms%22:%5B%7B%22title%22:%22I%20feel%20depressed%22,%22tags%22:%5B%22mood%22%5D,%22selected%22:true%7D,%7B%22title%22:%22I%20feel%20angry%22,%22tags%22:%5B%22significant%20events%22%5D,%22selected%22:true%7D%5D%7D';
      browser().navigateTo(link);
      pause();
      expect(element('#checklist li').count()).toBe(2);
      element('a[rel=\'next\']', 'Next button').click();
      expect(element('a.permalink').attr('href')).toEqual(unescape(link));
    });
  });
});
