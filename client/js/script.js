
  
$(document).ready(function() {

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


  
  
  // APPEARANCE DATE PICKER //
  
  var picker = $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    render: true
  });
  

  // TIME PICKER //
  
  $('#timepicker').pickatime({
    autoclose: false,
    twelvehour: false
  });


  // APPEARANCE SEARCH

  $('body').on('submit','.appearance_search_form', function(e) {
    
    e.preventDefault();
    
    var state = $('.appearance_search_state option:selected').text();
    var county = $('.appearance_search_county option:selected').text();
    var date = $('.datepicker').val();

    $('.appearance_search_results').children().remove()
        
    $.ajax({
      type: 'GET',
      url:'/api/appearances',
      success: function(data) {
        
        $.each(data, function(index, appearance) {
          
          // appearance location, time, and type, and id
          var courtName = appearance.courtInfo.courtName;
          var place = appearance.courtInfo.courtAddress.city + ', ' + appearance.courtInfo.courtAddress.state;
          var appearanceTime = appearance.appearanceTime;
          var appearanceType = appearance.appearanceType;
          var appearanceId = appearance._id;
          
          // grabbing date information
          var day = appearance.appearanceDate.slice(0,3);
          var month = appearance.appearanceDate.slice(4,7);
          var dateNum = appearance.appearanceDate.slice(8,10);
          var appearanceYear = appearance.appearanceDate.slice(11,15);
          var appearanceDay = dateNum + ' ' + month;

          // figuring out if appearance was posted within past 48 hours and thus 'new'
          var now = new Date();
          var parsed = Date.parse(now) / 1000;
          var appDate = appearance.date.toString();
          var appDateParsed = Date.parse(appDate) / 1000;
          var diff = Math.round(parsed - appDateParsed);
          var appearanceNew = diff < 172800 ? 'new' : '';

          // case information
          var caseType = appearance.caseType;
          var caseHeader = appearance.caseHeader;
          var caseNumber = appearance.caseNumber;
          var clientType = appearance.clientInfo.clientType;

          // client information         
          var clientName = appearance.clientInfo.name;

          // requesting attorney information
          var reqAttorneyName = appearance.reqAttorney.firstName + ' ' + appearance.reqAttorney.lastName;
          var reqAttorneyId = appearance.reqAttorney.id;
          var reqAttorneyFirmName = appearance.reqAttorney.firmName;
          var reqAttorneyEmail = appearance.reqAttorney.email;
          var reqAttorneyPhone = appearance.reqAttorney.phone;
          var reqAttorneyFax = appearance.reqAttorney.fax;
          var reqAttorneyStreet = appearance.reqAttorney.address.street;
          var reqAttorneyCity = appearance.reqAttorney.address.city;
          var reqAttorneyState = appearance.reqAttorney.address.state;
          var reqAttorneyZip = appearance.reqAttorney.address.zip;
          var reqAttorneyAddress = reqAttorneyCity + ', ' + reqAttorneyState + ' ' + reqAttorneyZip;
          
          if(date) {
            
              if(appearance.courtInfo.courtAddress.state === state && appearance.courtInfo.courtAddress.county === county && appearance.appearanceDate === date) {
              
              var appearanceTemp = $('.search_result_temp').clone()              
  
              $('.appearance_search_results').append(appearanceTemp);
              $('.collapsible').collapsible();

            }

          } else {

            if(appearance.courtInfo.courtAddress.state === state && appearance.courtInfo.courtAddress.county === county) {
              
              var appearanceTemp = $('.search_result_temp').clone()
              appearanceTemp.removeClass('search_result_temp');
              appearanceTemp.addClass(('search_result'));

              appearanceTemp.find('.search_result_appearanceNew').text(appearanceNew);  
              appearanceTemp.find('.search_result_appearanceDay').text(appearanceDay);
              appearanceTemp.find('.search_result_appearanceYear').text(appearanceYear);
                        
              appearanceTemp.find('.search_result_courtName').text(courtName);
              appearanceTemp.find('.search_result_place').text(place);
              appearanceTemp.find('.search_result_appearanceTime').text(appearanceTime);                          
              appearanceTemp.find('.search_result_appearanceType').text(appearanceType);

              appearanceTemp.find('.search_result_caseType').text(caseType);
              appearanceTemp.find('.search_result_caseHeader').text(caseHeader);
              appearanceTemp.find('.search_result_caseNumber').text(caseNumber);
              appearanceTemp.find('.search_result_clientType').text(clientType);

              appearanceTemp.find('.search_result_clientName').text(clientName);

              appearanceTemp.find('.search_result_appearanceID').text(appearanceId);

              appearanceTemp.find('.search_result_reqAttorneyName').text(reqAttorneyName);
              appearanceTemp.find('.search_result_reqAttorneyFirmName').text(reqAttorneyFirmName);              
              appearanceTemp.find('.search_result_reqAttorneyPhone').text(reqAttorneyPhone);
              appearanceTemp.find('.search_result_reqAttorneyFax').text(reqAttorneyFax);
              appearanceTemp.find('.search_result_reqAttorneyEmail').text(reqAttorneyEmail);
              appearanceTemp.find('.search_result_reqAttorneyStreet').text(reqAttorneyStreet);
              appearanceTemp.find('.search_result_reqAttorneyAddress').text(reqAttorneyAddress);
              
              $('.appearance_search_results').append(appearanceTemp);
              $('.collapsible').collapsible();
            }
          }
        });
      }
    });
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
    
  });

  

});
  

