  
$(document).ready(function(){
  
  $('.chips').material_chip();
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });
  
  $('.chips-placeholder').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
  });
  
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );

  $('select').material_select();


  // APPEARANCE SEARCH //
  
  // $('.appearance_search_state').on('click', '.appearance_search_state_option', function() {

  //   var state = $(this).text()
  //   $('.appearance_search_state').find('span').text(state);
  // });
  
  
  // $('.appearance_search_county').on('click', '.appearance_search_county_option', function() {
  //   var county = $(this).text();
  //   console.log(county);
  //   $('.appearance_search_county').find('span').text(county);
  // });

  // Appearance Date Picker
  
  var picker = $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    render: true
  });
  

  // TIME PICKER 
  
  $('#timepicker').pickatime({
    autoclose: false,
    twelvehour: false
  });


  // shows search results in appearance_search.ejs

  $('body').on('submit','.appearance_search_form', function(e) {
    
    
    e.preventDefault();
    
    var state = $('.appearance_search_state option:selected').text();
    var county = $('.appearance_search_county option:selected').text();
    var date = $('.datepicker').val();

    
    console.log(picker.get('value'));
    
    $('.appearance_search_results').children().remove()
        
    $.ajax({
      type: 'GET',
      url:'/api/appearances',
      success: function(data) {
        
        
        $.each(data, function(index, appearance) {
          
          console.log(appearance);
          
          if(date) {
            
              if(appearance.courtInfo.courtAddress.state === state && appearance.courtInfo.courtAddress.county === county && appearance.appearanceDate === date) {
              
              var appearanceTemp = $('.appearance_search_result_temp').clone()

              appearanceTemp.removeClass('appearance_search_result_temp');
              appearanceTemp.addClass(('appearance_search_result'));
                                        
              appearanceTemp.find('.appearance_search_result_appearanceType').text(appearance.appearanceType);
              appearanceTemp.find('.appearance_search_result_caseType').text(appearance.caseType);
              appearanceTemp.find('.appearance_search_result_caseHeader').text(appearance.caseHeader);
              appearanceTemp.find('.appearance_search_result_caseNumber').text(appearance.caseNumber);
              appearanceTemp.find('.appearance_search_result_appearanceDate').text(appearance.appearanceDate.slice(0,10));
              appearanceTemp.find('.appearance_search_result_appearanceTime').text(appearance.appearanceTime);
              appearanceTemp.find('.appearance_search_result_clientType').text(appearance.clientInfo.clientType);
              appearanceTemp.find('.appearance_search_result_clientName').text(appearance.clientInfo.name);
              appearanceTemp.find('.appearance_search_result_reqAttorney').text(appearance.reqAttorney);
              appearanceTemp.find('.appearance_search_result_appearanceID').text(appearance._id);
              
              $('.appearance_search_results').append(appearanceTemp);
            
            }

          } else {

            if(appearance.courtInfo.courtAddress.state === state && appearance.courtInfo.courtAddress.county === county) {
              
              var appearanceTemp = $('.appearance_search_result_temp').clone()

              appearanceTemp.removeClass('appearance_search_result_temp');
              appearanceTemp.addClass(('appearance_search_result'));

              console.log(appearance.clientInfo.name);
                          
              appearanceTemp.find('.appearance_search_result_appearanceType').text(appearance.appearanceType);
              appearanceTemp.find('.appearance_search_result_caseType').text(appearance.caseType);
              appearanceTemp.find('.appearance_search_result_caseHeader').text(appearance.caseHeader);
              appearanceTemp.find('.appearance_search_result_caseNumber').text(appearance.caseNumber);
              appearanceTemp.find('.appearance_search_result_appearanceDate').text(appearance.appearanceDate.slice(0,10));
              appearanceTemp.find('.appearance_search_result_appearanceTime').text(appearance.appearanceTime);
              appearanceTemp.find('.appearance_search_result_clientType').text(appearance.clientInfo.clientType);
              appearanceTemp.find('.appearance_search_result_clientName').text(appearance.clientInfo.name);
              appearanceTemp.find('.appearance_search_result_reqAttorney').text(appearance.reqAttorney);
              appearanceTemp.find('.appearance_search_result_appearanceID').text(appearance._id);
              appearanceTemp.find('.appearance_search_result_instruction').text(appearance.instructions);
              
              $('.appearance_search_results').append(appearanceTemp);
              $('.collapsible').collapsible();
            }
          }

        });
        
      }
    });
    
  });
  
  // 



  $('body').on('click', '.appearance_search_result', function() {

    


    // var box = $(this).find('.appearance_search_result_box');
    
    // if(box.is(':hidden')){
    //   box.slideDown('slow');
    // }else{
    //   box.slideUp('slow');
    // }

    
  });
  
  
  // DELETING REQUESTED APPEARANCE FROM APPEARANCES.EJS
  
  $('body').on('click', '.requested_appearance_delete', function() {
    
    var requestID = $(this).attr('id');
    console.log(requestID);
    
    var URL = '/api/appearances/' + requestID;
    
    $(this).parents('.requested_appearance').remove();
    
    $.ajax({
      type: 'DELETE',
      url: URL
    })
    
  })

});
  

