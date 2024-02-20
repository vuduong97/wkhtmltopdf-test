const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function htmlPuppeteer() {
  // Create a browser instance
  const browser = await puppeteer.launch({
    headless: true,
  });

  // Create a new page
  const page = await browser.newPage();

  //Get HTML content from HTML file
  const html = `<html>
  <head>
      <title>TripCase - In Lộ Trình của Quý khách</title>
      <meta charset="UTF-8" />
  </head>

  <style>
      @import url('https://fonts.cdnfonts.com/css/arial-2');  
      @page {
          margin: 0.3in;
      }

      body {
          padding: 0px;
          color: #333;
          font-family: Arial, Helvetica, Liberation Sans, Waree, WenQuanYi Zen Hei, Sazanami Gothic, UnDotum, sans-serif;
          font-size: 12px;
          background: #fff;
          background-color: transparent;
      }

      thead {
          display: table-row-group;
      }

      img {
          border-style: none;
      }

      h1 {
          color: #000;
          font-weight: bold;
          font-style: normal;
          font-size: 18px;
          background-color: transparent;
      }

      h2 {
          font-size: 18px;
          font-weight: normal;
          display: inline;
          background-color: transparent;
          text-transform: uppercase;
      }

      h3 {
          font-size: 24pt;
          font-weight: normal;
          display: inline;
          line-height: 22pt;
          background-color: transparent;
      }

      h4 {
          font-size: 24pt;
          font-weight: normal;
          display: inline;
          line-height: 0pt;
          background-color: transparent;
      }

      td {
          vertical-align: top;
      }

      p {
          background: transparent;
      }

      a {
          text-decoration: underline;
      }
      a:link,
      a:visited {
          color: #004f5a;
      }
      a:link,
      a:visited {
          color: #004f5a;
      }
      a:hover {
          text-decoration: none;
      }
      a:active {
          color: #000;
          text-decoration: none;
      }

      #footer {
          border-top: 3px double #000;
          color: #333;
          background: #efefef;
          width: 100%;
          height: 100px;
          vertical-align: top;
          padding: 0 0;
      }

      #footer .footer-left {
          background: transparent; /* for pdf */
          float: left;
          padding-left: 10px;
      }
      #footer .footer-right {
          background: transparent; /* for pdf */
          float: right;
          padding-right: 10px;
      }

      .segment {
          margin-bottom: 10px;
      }

      .segment {
          page-break-inside: avoid;
      }

      .segment-main {
          width: 100%;
          border-collapse: collapse;
      }

      .header-line {
          border-bottom: 1px solid #333;
          width: 100%;
          height: 1px;
      }

      .header-title {
          font-size: 16px;
          text-transform: uppercase;
          display: inline;
      }

      .header-title::after {
          content: ":";
      }

      .header {
          text-transform: uppercase;
          vertical-align: middle;
      }

      .header .value {
          font-weight: bold;
          font-size: 18px;
          text-transform: uppercase;
      }

      .header-top #preparedForAll {
          font-size: 14px;
      }

      .header-top .value {
          font-weight: bold;
          font-size: 18px;
          text-transform: uppercase;
      }

      .header-top .pnr {
          text-transform: uppercase;
          font-size: 18px;
          font-weight: bold;
      }

      .header .label {
          font-size: 16px;
          text-transform: uppercase;
      }

      .header .info-text {
          font-size: 9pt;
          color: #767676;
          text-transform: none;
      }

      .header td {
          vertical-align: middle;
      }

      .value {
          background: transparent; /* for pdf */
      }

      .nobr {
          background: transparent; /* for pdf */
          white-space: nowrap;
      }

      .label {
          background: transparent; /* for pdf */
      }

      /* for pdf */
      div.entry {
          clear: both;
      }

      .entry {
          margin: 10px 0;
          background: transparent; /* for pdf */
      }

      .entry:first-child {
          margin-top: 0;
          background: transparent; /* for pdf */
      }

      .entry:last-child {
          margin-bottom: 0;
          background: transparent; /* for pdf */
      }

      .location .cityCode {
          font-size: 18px;
      }

      .location .cityName {
          font-size: 12px;
          text-transform: uppercase;
      }

      .phone .value {
          font-size: 18px;
      }

      .segment-main-info {
          width: 220px;
          background: #e7e7e9;
      }

      .segment-main-info .content {
          padding: 5px 5px 0px 10px;
          background: transparent; /* for pdf */
      }

      .segment-main-info-corner {
          vertical-align: bottom;
          background: #e7e7e9;
          padding: 2% 0 0 0;
      }

      .segment-main-info-corner__img {
          background-image: url("https://wsp-intecom-backend-nest-c3af0b8c4e14.herokuapp.com/images/templates/corner.gif");
          background-repeat: no-repeat;
          height: 0;
          padding: 4%;
      }

      .segment-spacer {
          width: 2px;
      }

      .segment-main-details {
          padding: 5px 10px 10px 10px;
          width: 23%;
      }

      .segment-main-details-2cols {
          padding: 5px 10px 10px 10px;
          width: 46%;
      }

      .solid-top-bottom {
          border-top: 1px solid #c2c2c4;
          border-bottom: 1px solid #c2c2c4;
      }

      .solid-top {
          border-top: 1px solid #c2c2c4;
      }

      .solid-right {
          border-right: 1px solid #c2c2c4;
      }

      .solid-left {
          border-left: 1px solid #c2c2c4;
      }

      .solid-bottom {
          border-bottom: 1px solid #c2c2c4;
      }

      .dotted-left {
          border-left: 1px dotted #c2c2c4;
      }

      .dotted-top {
          border-top: 1px dotted #c2c2c4;
      }

      .segment-main .label {
          font-size: 12px;
      }

      .segment-main .value {
          font-size: 12px;
      }

      .inline {
          float: left;
          padding-right: 4px;
      }

      .location-arrow {
          vertical-align: middle;
      }

      .segment-main .time .value {
          font-size: 18px;
      }

      .segment-main .entry .date {
          font-size: 15px;
          font-weight: bold;
      }

      .segment-details {
          border-collapse: collapse;
      }

      .segment-details th {
          text-align: left;
          font-size: 12px;
          font-weight: normal;
          background: #e7e7e9;
          padding: 2px;
      }

      .segment-details td {
          font-size: 12px;
          padding: 2px 2px 3px 2px;
      }

      #tripInfo_travelDatesPrint {
          clear: right;
          width: 100%;
          border-bottom: 1px solid #333;
      }

      #tripInfo_travelDatesPrint .entry {
          margin: 0px 0px;
      }

      #tripInfo_travelDatesPrint p {
          font-size: 14px;
      }

      #tripInfo_travelDatesPrint .value {
          font-weight: bold;
          font-size: 18px;
      }

      #tripInfo_travelDatesPrint h1 {
          text-transform: uppercase;
          margin: 0px;
          padding: 0px 15px 0px 0px;
      }

      .segment_logo {
          padding: 2px 2px 2px 2px;
      }

      @media print {
          .noPrint {
              display: none;
          }
          .segment-main-info div.value {
              word-spacing: 3px;
          }
      }

      .adITINSEG {
          display: none;
      }

      .printHeaderLinks {
          margin-top: 0px;
          height: 18px;
          padding-right: 0px;
          text-align: right;
      }

      .printHeaderLinks a {
          margin-right: 10px;
      }

      .itineraryComment {
          font-size: 12px;
      }

      .itineraryFooterComment {
          font-size: 12px;
      }

      .itineraryComment .title {
          font-weight: bold;
      }

      .itineraryFooterComment .title {
          font-weight: bold;
      }

      #itineraryAdPRINTITINTOPFB {
          text-align: center;
      }

      #itineraryBottomAdsPrint {
          text-align: center;
          float: left;
      }
      .travelConsultant {
          text-transform: uppercase;
      }
      .tripInfoTravelDatesPrint .value {
          text-transform: uppercase;
      }

      .segment .airline-contact {
          margin-top: 10px;
          font-size: 14px;
          padding-left: 4px;
      }
      #itineraryPagePrint {
          max-width: 800px;
          margin: auto;
      }

      dl.contactNumbers {
          float: left;
          clear: left;
          margin-top: 5px;
          margin-bottom: 5px;
      }

      dl.contactNumbers dt {
          float: left;
          clear: left;
          font-size: 15px;
          font-weight: bold;
      }

      dl.contactNumbers dd {
          white-space: nowrap;
          text-align: right;
          float: right;
      }

      dl.contactNumbers {
          width: 100%;
      }

      .trainConfirmationNumberLabelPrint {
          border-top: dotted 1px;
          border-bottom: dotted 1px;
          border-color: #c2c2c4;
      }

      .itineraryComment {
          font-size: 12px;
          margin-top: 10px;
          margin-left: 5px;
      }

      .segmentInfoBig h3 {
          font-weight: bold;
          font-size: 13px;
          line-height: 13pt;
          text-transform: uppercase;
      }
      table.careyLimoDisclaimer {
          margin-top: 10px;
      }

      .hotel-rate-change {
          text-transform: uppercase;
          float: left;
      }

      .hotel-rate-change-div .box {
          border: 1px solid #d1d1d1;
      }

      .hotel-rate-change th {
          text-align: left;
          padding-bottom: 5px;
          font-weight: bold;
      }

      .hotel-rate-change tbody {
          float: left;
          padding: 10px;
      }
      .hotel-rate-change tr {
          width: 100%;
      }

      .hotel-rate-change td {
          padding: 2px 10px;
          font-size: 10px;
      }

      .tax-surcharge-td {
          padding: 2px 0px 2px 20px !important;
          font-size: 10px;
          width: 20%;
          text-align: right;
      }

      .hotel-voucher-td {
          padding: 2px 0px 2px 20px !important;
          white-space: nowrap;
          text-align: right;
      }

      .hotel-voucher-notes {
          word-break: break-word;
      }

      #itin-assigned-comments {
          font-size: 12px;
      }

      .air-segment-pax-header {
          color: #999;
          font-family: Arial, Helvetica, Liberation Sans, Waree, WenQuanYi Zen Hei, Sazanami Gothic, UnDotum, sans-serif;
          font-size: 12px;
          text-align: left;
          padding: 0 0 0 5px;
          width: 33%;
      }

      .air-segment-pax-value {
          color: #333;
          font-family: Arial, Helvetica, Liberation Sans, Waree, WenQuanYi Zen Hei, Sazanami Gothic, UnDotum, sans-serif;
          font-size: 12px;
          text-align: left;
          padding: 0 0 0 5px;
          width: 33%;
      }

      .contact-information {
          font-size: 18px;
      }
  </style>

  <body id="itineraryPagePrint">
      <div id="pageContainer">
          <div id="tripInfo_travelDatesPrint" class="entry tripInfoTravelDatesPrint">
              <h1>
                  ngày 24 tháng 1, 2024
                  <span><img src="https://wsp-intecom-backend-nest-c3af0b8c4e14.herokuapp.com/images/templates/arrow2.gif" alt="" /></span>
                  ngày 11 tháng 2, 2024 CHUYẾN ĐI ĐẾN
                  <span class="value">
                      VINH CITY, VIETNAM
                  </span>
              </h1>
          </div>

          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;" class="header-top" role="presentation">
              <tbody>
                  <tr>
                      <td width="50%" id="preparedForAll">
                          ĐÃ CHUẨN BỊ CHO<br />
                          <div class="value">
                              %%passenger_name_upper%%
                              <br />
                          </div>
                          <br />
                          MÃ ĐẶT CHỖ &nbsp;
                          <span style="font-size: 12px;">%%booking_code%%</span>
                      </td>
                      <td>
                          <div id="tripInfo_agencyLogo" class="entry tripInfoAgencyLogo">
                              <div id="logo-doc-content">
                                  <a href="javascript:windowpane('http://www.vietnamairlines.com','800','550',true)" aria-label="navigate to brander page">
                                      <img src="https://wsp-intecom-backend-nest-c3af0b8c4e14.herokuapp.com/images/templates/6928af569c7a6d36d71da2c2734d25f077a19e52.png" alt="brander logo" />
                                  </a>
                              </div>
                          </div>
                      </td>
                      <td style="padding-left: 10px;"></td>
                  </tr>
                  <tr>
                      <td colspan="3"></td>
                  </tr>
              </tbody>
          </table>
          <div class="noPrint"></div>
          <div id="itineraryBody">
              <div class="noPrint"></div>

              
              <div id="segmentAIR_1" class="segment">
                  <div class="header-line">&nbsp;</div>
                  <table cellpadding="0" cellspacing="0" class="header" role="presentation">
                      <tbody>
                          <tr>
                              <td class="segment_logo">
                                  <img id="print-icon-air" class="" src="https://wsp-intecom-backend-nest-c3af0b8c4e14.herokuapp.com/images/templates/air.png" alt="" />
                              </td>
                              <td>
                                  <span class="label">
                                      Khởi Hành:
                                  </span>
                                  <span id="departure-date-AIR_1" class="value">
                                      Thứ tư ngày 24 tháng 1
                                  </span>

                                  <span class="info-text">Vui lòng kiểm tra thời gian bay trước khi khởi hành</span>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <table border="0" cellpadding="0" cellspacing="0" class="segment-main" role="presentation">
                      <tbody>
                          <tr>
                              <td rowspan="2" class="segment-main-info">
                                  <div class="content">
                                      <h2 id="marketing-airline-name-AIR_1">
                                          %%airline_name%%
                                      </h2>
                                      <br />

                                      <h2 id="flight-number-AIR_1">
                                          <b>
                                              %%flight_number%%
                                          </b>
                                      </h2>

                                      <div class="entry">
                                          <div class="label" id="flight-duration-label-AIR_1">
                                              Thời gian bay:
                                          </div>
                                          <div dir="ltr" id="flight-duration-value-AIR_1">
                                              <span class="nobr">
                                                  2tiếng 15phút
                                              </span>
                                          </div>
                                      </div>

                                      <div class="entry">
                                          <div class="label" id="cabin-class-label-AIR_1">
                                              Khoang:
                                          </div>
                                          <div dir="ltr" id="cabin-class-value-AIR_1">
                                              <span class="nobr">
                                                  Phổ thông
                                              </span>
                                          </div>
                                      </div>

                                      <div class="entry">
                                          <div class="label" id="flight-status-label-AIR_1">
                                              Tình trạng chỗ:
                                          </div>
                                          <div id="flight-status-value-AIR_1">
                                              Đã xác nhận
                                          </div>
                                      </div>
                                  </div>
                              </td>
                              <td rowspan="3" class="segment-spacer"></td>
                              <td rowspan="1" colspan="2" class="segment-main-details solid-top solid-left">
                                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                      <tbody>
                                          <tr>
                                              <td>
                                                  <div class="content location">
                                                      <div id="departure-city-code-AIR_1" class="cityCode">SGN</div>
                                                      <div id="departure-city-name-AIR_1" class="cityName">
                                                          <span style="white-space: nowrap;">HO</span>
                                                          <span style="white-space: nowrap;">CHI</span>
                                                          <span style="white-space: nowrap;">MINH</span>
                                                          <span style="white-space: nowrap;">CITY,</span>
                                                          <span style="white-space: nowrap;">VIETNAM</span>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td class="location-arrow">
                                                  <img src='https://wsp-intecom-backend-nest-c3af0b8c4e14.herokuapp.com/images/templates/arrow2.gif' alt=''
                                              </td>
                                              <td>
                                                  <div class="content location">
                                                      <div id="arrival-city-code-AIR_1" class="cityCode">VII</div>
                                                      <div id="arrival-city-name-AIR_1" class="cityName">
                                                          <span style="white-space: nowrap;">VINH</span>
                                                          <span style="white-space: nowrap;">CITY,</span>
                                                          <span style="white-space: nowrap;">VIETNAM</span>
                                                      </div>
                                                  </div>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                              <td rowspan="3" class="segment-main-details solid-top-bottom solid-right dotted-left">
                                  <div class="content">
                                      <div class="entry">
                                          <div class="label inline" id="milage-label-AIR_1">
                                              Quãng đường đi (Dặm):
                                          </div>
                                          <div id="milage-value-AIR_1" class="value">
                                              546
                                          </div>
                                      </div>

                                      <div class="entry"></div>

                                      <div id="meals-label-AIR_1" class="label">
                                          Bữa ăn:
                                      </div>
                                      <div id="meals-value-AIR_1" class="value">
                                          Đồ Ăn Nhẹ
                                      </div>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td rowspan="2" class="segment-main-details solid-left solid-bottom dotted-top">
                                  <div class="content">
                                      <div class="entry time">
                                          <div class="label" id="departing-time-label-AIR_1">
                                              Giờ khởi hành:
                                          </div>
                                          <div id="departing-time-value-AIR_1" class="value">
                                              07:00
                                          </div>
                                      </div>

                                      <div class="entry">
                                          <div class="label" id="departing-terminal-label-AIR_1">
                                              Cổng:
                                          </div>
                                          <div id="departing-terminal-value-AIR_1" class="value">
                                              TERMINAL 1
                                          </div>
                                      </div>
                                  </div>
                              </td>
                              <td rowspan="2" class="segment-main-details dotted-left solid-bottom dotted-top">
                                  <div class="content">
                                      <div class="entry time">
                                          <div class="label" id="arriving-time-label-AIR_1">
                                              Giờ đến:
                                          </div>
                                          <div id="arriving-time-value-AIR_1" class="value">
                                              09:15
                                          </div>
                                      </div>
                                  </div>

                                  <div class="entry">
                                      <div class="label" id="arriving-terminal-label-AIR_1">
                                          Cổng:
                                      </div>
                                      <div id="arriving-terminal-value-AIR_1" class="value">
                                          Không có thông tin
                                      </div>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td class="segment-main-info-corner">
                                  <span class="segment-main-info-corner__img"></span>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <br />

                  <table width="100%" cellpadding="0" cellspacing="0" class="segment-details" id="segment-details_AIR_1" role="presentation">
                      <tbody>
                          <tr>
                              <th id="passengerName-header-AIR_1">
                                  <span style="white-space: nowrap;">Tên</span>
                                  <span style="white-space: nowrap;">Hành</span>
                                  <span style="white-space: nowrap;">Khách:</span>
                              </th>
                              <th id="seat-header-AIR_1" class="dotted-left">
                                  <span style="white-space: nowrap;">Ghế:</span>
                              </th>

                              <th id="frequentFlyer-header-AIR_1" class="dotted-left">
                                  <span style="white-space: nowrap;">Số</span>
                                  <span style="white-space: nowrap;">Hành</span>
                                  <span style="white-space: nowrap;">Khách</span>
                                  <span style="white-space: nowrap;">Bay</span>
                                  <span style="white-space: nowrap;">Thường</span>
                                  <span style="white-space: nowrap;">Xuyên:</span>
                              </th>

                              <th id="ticketNumber-header-AIR_1" class="dotted-left">
                                  <span style="white-space: nowrap;">Biên</span>
                                  <span style="white-space: nowrap;">Nhận</span>
                                  <span style="white-space: nowrap;">eTicket:</span>
                              </th>
                          </tr>

                          <tr>
                              <td>
                                  »
                                  <span id="PassengerName1_AIR_1">
                                      %%passenger_name%%
                                  </span>
                              </td>

                              <td class="dotted-left">
                                  <span id="Seats1_AIR_1">
                                      Được thông báo khi check in
                                  </span>
                              </td>

                              <td class="dotted-left">
                                  %%loyalty_code%% / %%airline_name%%
                              </td>

                              <td class="dotted-left">
                                  %%e_ticket_receipt%%
                                  <br />
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>

          </div>
          <div class="noPrint"></div>

          <div id="footer">
              <div class="footer-right"></div>
          </div>
      </div>
  </body>
</html>
`;
  await page.setContent(html, { waitUntil: "networkidle2" });
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // Download the PDF
  const pdf = await page.pdf({
    path: "result.pdf",
    // margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  // Close the browser instance
  await browser.close();
}

module.exports = { htmlPuppeteer };
