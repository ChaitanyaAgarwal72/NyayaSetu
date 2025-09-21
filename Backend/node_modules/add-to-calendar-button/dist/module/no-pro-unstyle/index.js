import { tzlib_get_ical_block, tzlib_get_offset, tzlib_get_timezones } from 'timezones-ical-library';
/*!
 *  @preserve
 *
 *  ++++++++++++++++++++++
 *  Add to Calendar Button
 *  ++++++++++++++++++++++
 *
 *  Version: 2.11.5
 *  Creator: Jens Kuerschner (https://jekuer.com)
 *  Project: https://github.com/add2cal/add-to-calendar-button
 *  License: Elastic License 2.0 (ELv2) (https://github.com/add2cal/add-to-calendar-button/blob/main/LICENSE.txt)
 *  Note:    DO NOT REMOVE THE COPYRIGHT NOTICE ABOVE!
 *
 */
const atcbVersion = '2.11.5';
const atcbCssTemplate = {};
const atcbIsBrowser = () => {
  if (typeof window === 'undefined') {
    return false;
  } else {
    return true;
  }
};
const atcbIsiOS = atcbIsBrowser()
  ? () => {
      if (/iPad|iPhone|iPod/i.test(navigator.userAgent) && !/MSStream/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    }
  : () => {
      return false;
    };
const atcbIsAndroid = atcbIsBrowser()
  ? () => {
      if (/android/i.test(navigator.userAgent) && !/MSStream/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    }
  : () => {
      return false;
    };
/*const atcbIsChrome = atcbIsBrowser()
  ? () => {
      if (/chrome|chromium|crios|google inc/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    }
  : () => {
      return false;
    };*/
const atcbIsSafari = atcbIsBrowser()
  ? () => {
      if (/^(?:(?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    }
  : () => {
      return false;
    };
const atcbIsMobile = () => {
  if (atcbIsAndroid() || atcbIsiOS()) {
    return true;
  } else {
    return false;
  }
};
const atcbIsWebView = atcbIsBrowser()
  ? () => {
      if (/; ?wv|(?:iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    }
  : () => {
      return false;
    };
const atcbIsProblematicWebView = atcbIsBrowser()
  ? () => {
      if (/Instagram/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    }
  : () => {
      return false;
    };
const atcbDefaultTarget = atcbIsWebView() ? '_system' : '_blank';
const atcbOptions = ['apple', 'google', 'ical', 'ms365', 'outlookcom', 'msteams', 'yahoo'];
const atcbValidRecurrOptions = ['apple', 'google', 'ical'];
const atcbInvalidSubscribeOptions = ['msteams'];
const atcbIOSInvalidOptions = ['ical'];
const atcbAndroidInvalidOptions = ['apple'];
const atcbStates = [];
const atcbWcParams = [
  'debug',
  'proOverride',
  'cspnonce',
  'identifier',
  'name',
  'dates',
  'description',
  'startDate',
  'startTime',
  'endDate',
  'endTime',
  'timeZone',
  'useUserTZ',
  'location',
  'status',
  'uid',
  'organizer',
  'attendee',
  'icsFile',
  'images',
  'recurrence',
  'recurrence_until',
  'recurrence_byDay',
  'recurrence_byMonth',
  'recurrence_byMonthDay',
  'recurrence_weekstart',
  'sequence',
  'recurrence_interval',
  'recurrence_count',
  'availability',
  'created',
  'updated',
  'subscribe',
  'options',
  'optionsMobile',
  'optionsIOS',
  'iCalFileName',
  'listStyle',
  'buttonStyle',
  'trigger',
  'hideIconButton',
  'hideIconList',
  'hideIconModal',
  'hideTextLabelButton',
  'hideTextLabelList',
  'buttonsList',
  'hideBackground',
  'hideCheckmark',
  'hideBranding',
  'size',
  'label',
  'inline',
  'inlineRsvp',
  'customLabels',
  'customCss',
  'lightMode',
  'language',
  'hideRichData',
  'bypassWebViewCheck',
  'blockInteraction',
  'styleLight',
  'styleDark',
  'disabled',
  'hidden',
  'hideButton',
  'pastDateHandling',
  'proxy',
  'fakeMobile',
  'fakeIOS',
  'fakeAndroid',
  'forceOverlay',
  'rsvp',
  'ty',
  'customVar',
  'domain',
  'dev',
];
const atcbWcProParams = [
  'debug',
  'proOverride',
  'cspnonce',
  'attendee',
  'images',
  'size',
  'inline',
  'inlineRsvp',
  'customLabels',
  'customCss',
  'lightMode',
  'language',
  'bypassWebViewCheck',
  'blockInteraction',
  'styleLight',
  'styleDark',
  'disabled',
  'hidden',
  'fakeMobile',
  'fakeIOS',
  'fakeAndroid',
  'forceOverlay',
  'customVar',
  'proxy',
  'domain',
  'dev',
];
const atcbWcBooleanParams = [
  'debug',
  'proOverride',
  'useUserTZ',
  'hideIconButton',
  'hideIconList',
  'hideIconModal',
  'hideTextLabelButton',
  'hideTextLabelList',
  'subscribe',
  'hideBackground',
  'hideCheckmark',
  'hideBranding',
  'inlineRsvp',
  'hideRichData',
  'buttonsList',
  'inline',
  'bypassWebViewCheck',
  'blockInteraction',
  'disabled',
  'hidden',
  'hideButton',
  'proxy',
  'fakeMobile',
  'fakeIOS',
  'fakeAndroid',
  'forceOverlay',
  'dev',
];
const atcbWcObjectParams = ['customLabels', 'ty', 'rsvp', 'customVar'];
const atcbWcObjectArrayParams = ['dates'];
const atcbWcArrayParams = ['images', 'options', 'optionsMobile', 'optionsIOS'];
const atcbWcNumberParams = ['sequence', 'recurrence_interval', 'recurrence_count'];
const atcbIcon = {
  trigger:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200.016"><path d="M132.829 7.699c0-4.248 4.199-7.699 9.391-7.699s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zm-5.941 123.747c2.979 0 5.404 2.425 5.404 5.404s-2.425 5.404-5.404 5.404l-21.077-.065-.065 21.045c0 2.979-2.425 5.404-5.404 5.404s-5.404-2.425-5.404-5.404l.065-21.061-21.045-.081c-2.979 0-5.404-2.425-5.404-5.404s2.425-5.404 5.404-5.404l21.061.065.065-21.045c0-2.979 2.425-5.404 5.404-5.404s5.404 2.425 5.404 5.404l-.065 21.077 21.061.065zM48.193 7.699C48.193 3.451 52.393 0 57.585 0s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zM10.417 73.763h179.167V34.945c0-1.302-.537-2.49-1.4-3.369-.863-.863-2.051-1.4-3.369-1.4h-17.171c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h17.171c4.183 0 7.975 1.709 10.726 4.46S200 30.762 200 34.945v44.043 105.843c0 4.183-1.709 7.975-4.46 10.726s-6.543 4.46-10.726 4.46H15.186c-4.183 0-7.975-1.709-10.726-4.46C1.709 192.79 0 188.997 0 184.814V78.988 34.945c0-4.183 1.709-7.975 4.46-10.726s6.543-4.46 10.726-4.46h18.343c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208H15.186c-1.302 0-2.49.537-3.369 1.4-.863.863-1.4 2.051-1.4 3.369zm179.167 10.433H10.417v100.618c0 1.302.537 2.49 1.4 3.369.863.863 2.051 1.4 3.369 1.4h169.629c1.302 0 2.49-.537 3.369-1.4.863-.863 1.4-2.051 1.4-3.369zM82.08 30.176c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h34.977c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208z"/></svg>',
  apple:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 245.657"><path d="M167.084 130.514c-.308-31.099 25.364-46.022 26.511-46.761-14.429-21.107-36.91-24.008-44.921-24.335-19.13-1.931-37.323 11.27-47.042 11.27-9.692 0-24.67-10.98-40.532-10.689-20.849.308-40.07 12.126-50.818 30.799-21.661 37.581-5.54 93.281 15.572 123.754 10.313 14.923 22.612 31.688 38.764 31.089 15.549-.612 21.433-10.073 40.242-10.073s24.086 10.073 40.546 9.751c16.737-.308 27.34-15.214 37.585-30.187 11.855-17.318 16.714-34.064 17.009-34.925-.372-.168-32.635-12.525-32.962-49.68l.045-.013zm-30.917-91.287C144.735 28.832 150.524 14.402 148.942 0c-12.344.503-27.313 8.228-36.176 18.609-7.956 9.216-14.906 23.904-13.047 38.011 13.786 1.075 27.862-7.004 36.434-17.376z"/></svg>',
  google:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M152.637 47.363H47.363v105.273h105.273z" fill="#fff"/><path d="M152.637 200L200 152.637h-47.363z" fill="#f72a25"/><path d="M200 47.363h-47.363v105.273H200z" fill="#fbbc04"/><path d="M152.637 152.637H47.363V200h105.273z" fill="#34a853"/><path d="M0 152.637v31.576A15.788 15.788 0 0 0 15.788 200h31.576v-47.363z" fill="#188038"/><path d="M200 47.363V15.788A15.79 15.79 0 0 0 184.212 0h-31.575v47.363z" fill="#1967d2"/><path d="M15.788 0A15.79 15.79 0 0 0 0 15.788v136.849h47.363V47.363h105.274V0z" fill="#4285f4"/><path d="M68.962 129.02c-3.939-2.653-6.657-6.543-8.138-11.67l9.131-3.76c.83 3.158 2.279 5.599 4.346 7.341 2.051 1.742 4.557 2.588 7.471 2.588 2.995 0 5.55-.911 7.699-2.718 2.148-1.823 3.223-4.134 3.223-6.934 0-2.865-1.139-5.208-3.402-7.031s-5.111-2.718-8.496-2.718h-5.273v-9.033h4.736c2.913 0 5.387-.781 7.389-2.376 2.002-1.579 2.995-3.743 2.995-6.494 0-2.441-.895-4.395-2.686-5.859s-4.053-2.197-6.803-2.197c-2.686 0-4.818.716-6.396 2.148s-2.767 3.255-3.451 5.273l-9.033-3.76c1.204-3.402 3.402-6.396 6.624-8.984s7.34-3.89 12.337-3.89c3.695 0 7.031.716 9.977 2.148s5.257 3.418 6.934 5.941c1.676 2.539 2.507 5.387 2.507 8.545 0 3.223-.781 5.941-2.327 8.187-1.546 2.23-3.467 3.955-5.729 5.143v.537a17.39 17.39 0 0 1 7.34 5.729c1.904 2.572 2.865 5.632 2.865 9.212s-.911 6.771-2.718 9.57c-1.823 2.799-4.329 5.013-7.52 6.624s-6.787 2.425-10.775 2.425c-4.622 0-8.887-1.318-12.826-3.988zm56.087-45.312l-10.026 7.243-5.013-7.601 17.985-12.972h6.901v61.198h-9.847z" fill="#1a73e8"/></svg>',
  ical: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200.016"><path d="M132.829 7.699c0-4.248 4.199-7.699 9.391-7.699s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zm-25.228 161.263c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm-81.803-59.766c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.918 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zM25.798 139.079c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.918 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zM25.798 168.962c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zm40.902 0c-.553 0-.993-2.327-.993-5.208s.439-5.208.993-5.208h25.7c.553 0 .993 2.327.993 5.208s-.439 5.208-.993 5.208zM48.193 7.699C48.193 3.451 52.393 0 57.585 0s9.391 3.451 9.391 7.699v33.724c0 4.248-4.199 7.699-9.391 7.699s-9.391-3.451-9.391-7.699zM10.417 73.763h179.15V34.945c0-1.302-.537-2.49-1.4-3.369-.863-.863-2.051-1.4-3.369-1.4h-17.155c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h17.171c4.183 0 7.975 1.709 10.726 4.46S200 30.762 200 34.945v44.043 105.843c0 4.183-1.709 7.975-4.46 10.726s-6.543 4.46-10.726 4.46H15.186c-4.183 0-7.975-1.709-10.726-4.46C1.709 192.79 0 188.997 0 184.814V78.971 34.945c0-4.183 1.709-7.975 4.46-10.726s6.543-4.46 10.726-4.46h18.343c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208H15.186c-1.302 0-2.49.537-3.369 1.4-.863.863-1.4 2.051-1.4 3.369zm179.167 10.433H10.417v100.618c0 1.302.537 2.49 1.4 3.369.863.863 2.051 1.4 3.369 1.4h169.629c1.302 0 2.49-.537 3.369-1.4.863-.863 1.4-2.051 1.4-3.369zM82.08 30.176c-2.881 0-5.208-2.327-5.208-5.208s2.327-5.208 5.208-5.208h34.977c2.881 0 5.208 2.327 5.208 5.208s-2.327 5.208-5.208 5.208z"/></svg>',
  msteams:
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 186.047"><path d="M195.349 39.535a20.93 20.93 0 1 1-41.86 0 20.93 20.93 0 1 1 41.86 0zm-55.847 30.233h51.66A8.84 8.84 0 0 1 200 78.605v47.056c0 17.938-14.541 32.479-32.479 32.479h0-.154c-17.938.003-32.481-14.537-32.484-32.474v-.005-51.274a4.62 4.62 0 0 1 4.619-4.619z" fill="#5059c9"/><path d="M149.614 69.767H64.34c-4.823.119-8.637 4.122-8.526 8.944v53.67c-.673 28.941 22.223 52.957 51.163 53.665 28.94-.708 51.836-24.725 51.163-53.665v-53.67c.112-4.823-3.703-8.825-8.526-8.944zm-10.079-39.535a30.233 30.233 0 0 1-60.465 0 30.233 30.233 0 0 1 60.465 0z" fill="#7b83eb"/><path opacity=".1" d="M111.628 69.767v75.209c-.023 3.449-2.113 6.547-5.302 7.86-1.015.43-2.107.651-3.209.651H59.907l-1.628-4.651c-1.628-5.337-2.459-10.885-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z"/><path opacity=".2" d="M106.977 69.767v79.86a8.241 8.241 0 0 1-.651 3.209c-1.313 3.189-4.412 5.279-7.86 5.302H62.093l-2.186-4.651a46.13 46.13 0 0 1-1.628-4.651 56.647 56.647 0 0 1-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z"/><path opacity=".2" d="M102.326 69.767v70.558a8.58 8.58 0 0 1-8.512 8.512H58.279a56.647 56.647 0 0 1-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z"/><path opacity=".1" d="M111.628 45.721v14.651l-2.326.093c-.791 0-1.535-.046-2.326-.093-1.57-.104-3.127-.353-4.651-.744a30.233 30.233 0 0 1-20.93-17.767 25.845 25.845 0 0 1-1.488-4.651h23.209c4.693.018 8.494 3.818 8.512 8.512z"/><use xlink:href="#B" opacity=".2" transform="scale(.08973306)"/><path d="M106.977 50.372v10c-1.57-.104-3.127-.353-4.651-.744a30.233 30.233 0 0 1-20.93-17.767h17.07c4.693.018 8.494 3.818 8.512 8.512zm0 19.395v70.558a8.58 8.58 0 0 1-8.512 8.512H58.279a56.647 56.647 0 0 1-2.465-16.465V78.698c-.112-4.815 3.697-8.811 8.512-8.93z" opacity=".2"/><path opacity=".2" d="M102.326 50.372v9.256a30.233 30.233 0 0 1-20.93-17.767h12.419c4.693.018 8.494 3.818 8.512 8.512z"/><linearGradient id="A" gradientUnits="userSpaceOnUse" x1="17.776" y1="35.199" x2="84.55" y2="150.848"><stop offset="0" stop-color="#5a62c3"/><stop offset=".5" stop-color="#4d55bd"/><stop offset="1" stop-color="#3940ab"/></linearGradient><path fill="url(#A)" d="M8.526 41.86H93.8a8.53 8.53 0 0 1 8.526 8.526v85.274a8.53 8.53 0 0 1-8.526 8.526H8.526A8.53 8.53 0 0 1 0 135.66V50.386a8.53 8.53 0 0 1 8.526-8.526z"/><path fill="#fff" d="M73.6 74.316H56.553v46.419h-10.86V74.316H28.726v-9.005H73.6z"/><defs><path id="B" d="M1192.167 561.355v111.442c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 0 1-233.25-198.003h190.228c52.304.198 94.656 42.55 94.855 94.854z"/></defs></svg>',
  ms365: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 239.766"><path d="M200 219.785l-.021-.012V20.591L128.615 0 .322 48.172 0 48.234.016 192.257l43.78-17.134V57.943l84.819-20.279-.012 172.285L.088 192.257l128.515 47.456v.053l71.376-19.753v-.227z"/></svg>',
  outlookcom:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 175"><path d="M178.725 0H71.275A8.775 8.775 0 0 0 62.5 8.775v9.975l60.563 18.75L187.5 18.75V8.775A8.775 8.775 0 0 0 178.725 0z" fill="#0364b8"/><path d="M197.813 96.281c.915-2.878 2.187-5.855 2.187-8.781-.002-1.485-.795-2.857-1.491-3.26l-68.434-38.99a9.37 9.37 0 0 0-9.244-.519c-.312.154-.614.325-.906.512l-67.737 38.6-.025.013-.075.044a4.16 4.16 0 0 0-2.088 3.6c.541 2.971 1.272 5.904 2.188 8.781l71.825 52.532z" fill="#0a2767"/><path d="M150 18.75h-43.75L93.619 37.5l12.631 18.75L150 93.75h37.5v-37.5z" fill="#28a8ea"/><path d="M150 18.75h37.5v37.5H150z" fill="#50d9ff"/><path d="M150 93.75l-43.75-37.5H62.5v37.5l43.75 37.5 67.7 11.05z" fill="#0364b8"/><path d="M106.25 56.25v37.5H150v-37.5zM150 93.75v37.5h37.5v-37.5zm-87.5-75h43.75v37.5H62.5z" fill="#0078d4"/><path d="M62.5 93.75h43.75v37.5H62.5z" fill="#064a8c"/><path d="M126.188 145.113l-73.706-53.75 3.094-5.438 68.181 38.825a3.3 3.3 0 0 0 2.625-.075l68.331-38.937 3.1 5.431z" fill="#0a2767" opacity=".5"/><path d="M197.919 91.106l-.088.05-.019.013-67.738 38.588c-2.736 1.764-6.192 1.979-9.125.569l23.588 31.631 51.588 11.257v-.001c2.434-1.761 3.876-4.583 3.875-7.587V87.5c.001 1.488-.793 2.862-2.081 3.606z" fill="#1490df"/><path d="M200 165.625v-4.613l-62.394-35.55-7.531 4.294a9.356 9.356 0 0 1-9.125.569l23.588 31.631 51.588 11.231v.025a9.362 9.362 0 0 0 3.875-7.588z" opacity=".05"/><path d="M199.688 168.019l-68.394-38.956-1.219.688c-2.734 1.766-6.19 1.984-9.125.575l23.588 31.631 51.587 11.256v.001a9.38 9.38 0 0 0 3.562-5.187z" opacity=".1"/><path d="M51.455 90.721c-.733-.467-1.468-1.795-1.455-3.221v78.125c-.007 5.181 4.194 9.382 9.375 9.375h131.25c1.395-.015 2.614-.366 3.813-.813.638-.258 1.252-.652 1.687-.974z" fill="#28a8ea"/><path d="M112.5 141.669V39.581a8.356 8.356 0 0 0-8.331-8.331H62.687v46.6l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031V150h54.169a8.356 8.356 0 0 0 8.331-8.331z" opacity=".1"/><path d="M106.25 147.919V45.831a8.356 8.356 0 0 0-8.331-8.331H62.687v40.35l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031 68.75h47.919a8.356 8.356 0 0 0 8.331-8.331z" opacity=".2"/><path d="M106.25 135.419V45.831a8.356 8.356 0 0 0-8.331-8.331H62.687v40.35l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031 56.25h47.919a8.356 8.356 0 0 0 8.331-8.331z" opacity=".2"/><path d="M100 135.419V45.831a8.356 8.356 0 0 0-8.331-8.331H62.687v40.35l-10.5 5.987-.031.012-.075.044A4.162 4.162 0 0 0 50 87.5v.031-.031 56.25h41.669a8.356 8.356 0 0 0 8.331-8.331z" opacity=".2"/><path d="M8.331 37.5h83.337A8.331 8.331 0 0 1 100 45.831v83.338a8.331 8.331 0 0 1-8.331 8.331H8.331A8.331 8.331 0 0 1 0 129.169V45.831A8.331 8.331 0 0 1 8.331 37.5z" fill="#0078d4"/><path d="M24.169 71.675a26.131 26.131 0 0 1 10.263-11.337 31.031 31.031 0 0 1 16.313-4.087 28.856 28.856 0 0 1 15.081 3.875 25.875 25.875 0 0 1 9.988 10.831 34.981 34.981 0 0 1 3.5 15.938 36.881 36.881 0 0 1-3.606 16.662 26.494 26.494 0 0 1-10.281 11.213 30 30 0 0 1-15.656 3.981 29.556 29.556 0 0 1-15.425-3.919 26.275 26.275 0 0 1-10.112-10.85 34.119 34.119 0 0 1-3.544-15.744 37.844 37.844 0 0 1 3.481-16.563zm10.938 26.613a16.975 16.975 0 0 0 5.769 7.463 15.069 15.069 0 0 0 9.019 2.719 15.831 15.831 0 0 0 9.631-2.806 16.269 16.269 0 0 0 5.606-7.481 28.913 28.913 0 0 0 1.787-10.406 31.644 31.644 0 0 0-1.687-10.538 16.681 16.681 0 0 0-5.413-7.75 14.919 14.919 0 0 0-9.544-2.956 15.581 15.581 0 0 0-9.231 2.744 17.131 17.131 0 0 0-5.9 7.519 29.85 29.85 0 0 0-.044 21.5z" fill="#fff"/></svg>',
  yahoo:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 177.803"><path d="M0 43.284h38.144l22.211 56.822 22.5-56.822h37.135L64.071 177.803H26.694l15.308-35.645L.001 43.284zm163.235 45.403H121.64L158.558 0 200 .002zm-30.699 8.488c12.762 0 23.108 10.346 23.108 23.106s-10.345 23.106-23.108 23.106a23.11 23.11 0 0 1-23.104-23.106 23.11 23.11 0 0 1 23.104-23.106z"/></svg>',
  close:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M2.321 13.529a7.927 7.927 0 0 1 0-11.208 7.927 7.927 0 0 1 11.208 0l86.471 86.471L186.47 2.321a7.927 7.927 0 0 1 11.209 0 7.927 7.927 0 0 1 0 11.208l-86.474 86.469 86.472 86.473a7.927 7.927 0 0 1-11.209 11.208l-86.471-86.471-86.469 86.471a7.927 7.927 0 0 1-11.208-11.208l86.471-86.473z"/></svg>',
  location:
    '<svg viewBox="0 0 200 266.42" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m148.54 230.43c-12.12 13.291-26.234 25.193-42.083 34.82-1.9513 1.431-4.5964 1.6044-6.7645 0.21681-23.416-14.895-43.08-32.782-58.539-52.23-21.334-26.755-34.755-56.414-39.351-84.99-4.6831-28.966-0.30354-56.848 14.114-79.505 5.6805-8.9543 12.944-17.106 21.79-24.153 20.337-16.196 43.557-24.76 66.713-24.586 22.288 0.17345 44.295 8.4773 63.309 25.844 6.6778 6.0707 12.293 13.03 16.89 20.575 15.502 25.54 18.841 58.105 12.033 91.104-6.7212 32.608-23.416 65.737-48.11 92.839zm-48.544-178.91c27.492 0 49.758 22.288 49.758 49.758 0 27.492-22.288 49.758-49.758 49.758-27.492 0-49.758-22.267-49.758-49.758-0.02168-27.492 22.267-49.758 49.758-49.758z" stroke-width="2.1681"/></svg>',
  warning:
    '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="m100 0c27.613 0 52.613 11.195 70.711 29.293 18.094 18.094 29.289 43.098 29.289 70.707 0 27.613-11.195 52.613-29.289 70.711-18.098 18.094-43.098 29.289-70.711 29.289-27.609 0-52.613-11.195-70.707-29.289-18.098-18.098-29.293-43.098-29.293-70.711 0-27.609 11.195-52.613 29.293-70.707 18.094-18.098 43.098-29.293 70.707-29.293zm57.66 42.34c-14.758-14.754-35.145-23.883-57.66-23.883-22.516 0-42.902 9.1289-57.66 23.883-14.754 14.758-23.883 35.145-23.883 57.66 0 22.516 9.1289 42.902 23.883 57.66 14.758 14.754 35.145 23.883 57.66 23.883 22.516 0 42.902-9.1289 57.66-23.883 14.754-14.758 23.883-35.145 23.883-57.66 0-22.516-9.1289-42.902-23.883-57.66z" fill="#f44336" fill-rule="nonzero" stroke-width=".39062"/><g transform="matrix(3.8384 0 0 3.8384 2277.8 -576.85)" style="shape-inside:url(#rect7396);white-space:pre" aria-label="!"><path d="m-563.8 161.59-0.65341 20.185h-5.8381l-0.65341-20.185zm-3.5796 29.503q-1.5199 0-2.6136-1.0795-1.0796-1.0796-1.0796-2.6136 0-1.5057 1.0796-2.571 1.0938-1.0796 2.6136-1.0796 1.4631 0 2.571 1.0796 1.1222 1.0653 1.1222 2.571 0 1.0227-0.52557 1.8608-0.51137 0.83807-1.3494 1.3352-0.82387 0.49715-1.8182 0.49715z"/></g></svg>',
  checkmark:
    '<svg version="1.1" viewBox="0 0 87.41 79.72" xmlns="http://www.w3.org/2000/svg"><path d="m2.076 33.666s6.0748-0.59297 17.413 4.2983c9.3883 4.5751 11.891 8.3955 11.891 8.3955 5.38-8.65 11.11-16.6 17.16-23.9 10.412-12.578 24.613-22.448 24.613-22.448l14.257-0.012228s-19.308 19.294-32.483 38.51-22.877 41.21-22.877 41.21-9.3948-18.164-14.53-24.53-10.77-11.59-17.52-16.22z" fill="#45b555"/></svg>',
  rsvp: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 104.31 122.88"><g><path d="M25.85,63.15c-0.04-0.12-0.08-0.28-0.1-0.42c-0.22-1.89-0.43-3.98-0.62-5.78c-0.26-2.64-0.55-5.69-0.76-7.83 c-0.14-1.45-0.6-2.83-1.27-3.86c-0.45-0.66-0.95-1.15-1.51-1.39c-0.45-0.18-1-0.2-1.57,0.02c-0.78,0.3-1.65,0.93-2.62,2.03 c-0.86,0.98-1.53,2.29-2.09,3.68c-0.79,2.03-1.26,4.19-1.45,5.67c-0.02,0.1-0.02,0.18-0.06,0.26L8.42,86.07 c-0.08,0.4-0.24,0.76-0.48,1.04c-1.81,2.33-2.95,4.33-3.28,5.95c-0.24,1.19,0,2.15,0.79,2.9l19.8,19.8 c1.26,1.21,2.72,1.97,4.47,2.29c1.91,0.36,4.14,0.16,6.7-0.54c0.04,0,0.1-0.02,0.14-0.02c0.97-0.26,2.24-0.57,3.46-0.88 c5.31-1.29,9.94-2.43,14.23-6.33l5.52-5.76c0.05-0.1,0.14-0.18,0.22-0.26s0.62-0.62,1.35-1.31c3.78-3.69,8.45-8.25,5.61-12.24 l-2.21-2.21c-1.07,1.04-2.21,2.05-3.3,3.02c-1,0.88-1.93,1.69-2.78,2.55c-0.91,0.91-2.38,0.91-3.3,0c-0.91-0.92-0.91-2.38,0-3.3 c0.86-0.86,1.91-1.79,3-2.76c3.74-3.3,8.03-7.07,5.73-10.38l-2.19-2.19c-0.12-0.12-0.22-0.26-0.31-0.4c-1.26,1.29-2.64,2.52-4,3.72 c-1,0.88-1.93,1.69-2.78,2.55c-0.91,0.91-2.38,0.91-3.3,0s-0.91-2.38,0-3.3c0.86-0.86,1.91-1.79,3-2.76 c3.74-3.3,8.03-7.07,5.73-10.38l-2.19-2.19c-0.16-0.16-0.28-0.31-0.38-0.5l-6.42,6.42c-0.91,0.91-2.38,0.91-3.3,0s-0.91-2.38,0-3.3 l17.22-17.25c2.88-2.88,3.54-5.88,2.78-8.15c-0.28-0.83-0.74-1.57-1.31-2.14s-1.31-1.03-2.14-1.31c-2.24-0.74-5.23-0.06-8.19,2.9 l-30.2,30.2c-0.91,0.91-2.38,0.91-3.3,0s-0.91-2.38,0-3.3l3.07-3.07L25.85,63.15L25.85,63.15L25.85,63.15z M83.23,24.31 c-1.22,1.3-3.24,1.34-4.52,0.14c-1.3-1.22-1.34-3.24-0.14-4.52l8.82-9.39c1.22-1.3,3.25-1.34,4.52-0.14 c1.3,1.22,1.34,3.24,0.14,4.52L83.23,24.31L83.23,24.31L83.23,24.31L83.23,24.31z M43.96,23.65c1.3,1.22,1.34,3.25,0.14,4.52 c-1.22,1.3-3.25,1.34-4.52,0.14l-9.4-8.82c-1.29-1.23-1.33-3.25-0.14-4.52c1.22-1.3,3.25-1.34,4.52-0.14L43.96,23.65L43.96,23.65 L43.96,23.65z M63.69,15.96c0.05,1.76-1.34,3.24-3.09,3.3s-3.24-1.34-3.3-3.09L56.91,3.3c-0.06-1.75,1.34-3.24,3.09-3.3 c1.76-0.05,3.24,1.34,3.29,3.09L63.69,15.96L63.69,15.96L63.69,15.96z M76.88,63.31c-1.3-1.22-1.34-3.25-0.14-4.52 c1.22-1.3,3.24-1.34,4.52-0.14l9.39,8.82c1.3,1.22,1.34,3.24,0.14,4.52c-1.22,1.3-3.24,1.34-4.52,0.14L76.88,63.31L76.88,63.31 L76.88,63.31z M88.36,44.35c-1.75,0.06-3.24-1.34-3.3-3.09c-0.05-1.75,1.34-3.24,3.09-3.3l12.86-0.43c1.75-0.06,3.24,1.34,3.3,3.09 s-1.34,3.24-3.09,3.3L88.36,44.35L88.36,44.35L88.36,44.35z M60.88,58.97c0.17,0.1,0.34,0.22,0.5,0.38l2.29,2.29 c0.12,0.12,0.24,0.28,0.34,0.42c2.57,3.52,2.17,6.66,0.42,9.52c0.31,0.12,0.62,0.29,0.86,0.54l2.29,2.29 c0.12,0.12,0.24,0.28,0.34,0.42c2.76,3.8,2.07,7.12,0,10.14c0.1,0.05,0.17,0.14,0.28,0.24l2.29,2.29c0.12,0.12,0.24,0.28,0.34,0.42 c5.31,7.26-1.02,13.42-6.1,18.39l-1.31,1.31l-5.67,5.95l-0.18,0.17c-5.19,4.71-10.33,5.97-16.28,7.42c-1,0.24-2,0.5-3.4,0.86 c-0.04,0-0.06,0.02-0.1,0.02c-3.22,0.88-6.14,1.09-8.76,0.62c-2.66-0.48-4.97-1.67-6.9-3.56L2.31,99.29 c-2-1.93-2.69-4.31-2.12-7.14c0.43-2.26,1.75-4.77,3.81-7.47L9.3,54.74v-0.12c0.24-1.71,0.78-4.24,1.71-6.68 c0.71-1.83,1.67-3.62,2.92-5.07c1.51-1.71,3-2.76,4.47-3.32c1.81-0.69,3.54-0.6,5.07,0.06c1.43,0.6,2.64,1.69,3.56,3.08 c1.12,1.67,1.85,3.8,2.05,6.02c0.16,1.83,0.48,4.85,0.78,7.81l0.24,2.47L53,36.07c4.4-4.4,9.16-5.27,12.97-4.02 c1.53,0.5,2.88,1.33,4,2.45s1.95,2.47,2.45,4c1.26,3.8,0.4,8.63-3.92,12.95l-7.59,7.59L60.88,58.97L60.88,58.97L60.88,58.97z"/></g></svg>',
};


async function atcb_decorate_data(data) {
  data = atcb_decorate_data_boolean(data);
  data = atcb_decorate_data_defaults(data);
  data = atcb_decorate_data_rrule(data);
  data = atcb_decorate_data_options(data);
  data = atcb_decorate_data_style(data);
  data.sizes = atcb_decorate_sizes(data.size);
  data.lightMode = atcb_decorate_light_mode(data.lightMode);
  data = atcb_decorate_data_i18n(data);
  data = atcb_decorate_data_dates(data);
  data = atcb_decorate_data_button_status_handling(data);
  data = await atcb_decorate_data_rsvp(data);
  return data;
}
function atcb_decorate_data_boolean(data) {
  for (let i = 0; i < atcbWcBooleanParams.length; i++) {
    const attr = atcbWcBooleanParams[`${i}`];
    if (data[`${attr}`]) {
      if (typeof data[`${attr}`] !== 'boolean') {
        const val = data[`${attr}`].toString().trim().toLowerCase() || '';
        data[`${attr}`] = val === '' || val === 'true' ? true : false;
      }
    } else {
      data[`${attr}`] = false;
    }
  }
  return data;
}
function atcb_set_date_defaults(dateEntry) {
  if (!dateEntry.timeZone || dateEntry.timeZone === '') {
    dateEntry.timeZone = 'GMT';
  }
  if (!dateEntry.status || dateEntry.status === '') {
    dateEntry.status = 'CONFIRMED';
  }
  if (!dateEntry.sequence || dateEntry.sequence === '') {
    dateEntry.sequence = 0;
  } else {
    dateEntry.sequence = parseInt(dateEntry.sequence);
    if (isNaN(dateEntry.sequence) || dateEntry.sequence < 0) {
      dateEntry.sequence = 0;
    }
  }
}
function atcb_decorate_data_defaults(data) {
  if (data.dates) {
    for (let i = 0; i < data.dates.length; i++) {
      atcb_set_date_defaults(data.dates[`${i}`]);
    }
  } else {
    atcb_set_date_defaults(data);
  }
  if (!data.language || data.language === '' || !availableLanguages.includes(data.language)) {
    data.language = 'en';
  }
  return data;
}
function atcb_decorate_data_rrule(data) {
  if (data.recurrence && data.recurrence !== '') {
    data.recurrence = data.recurrence.replace(/\s+/g, '').toUpperCase();
    if (!/^(?:RRULE:[\w=;,:+\-/\\]+|daily|weekly|monthly|yearly)$/im.test(data.recurrence)) {
      data.recurrence = '!wrong rrule format!';
    } else {
      if (/^RRULE:/i.test(data.recurrence)) {
        data.recurrence_simplyfied = false;
        const rruleParts = data.recurrence.substring(6).split(';');
        const rruleObj = new Object();
        rruleParts.forEach(function (rule) {
          rruleObj[rule.split('=')[0]] = rule.split('=')[1];
        });
        data.recurrence_until = rruleObj.UNTIL ? rruleObj.UNTIL : '';
        data.recurrence_count = rruleObj.COUNT ? rruleObj.COUNT : '';
        data.recurrence_byDay = rruleObj.BYDAY ? rruleObj.BYDAY : '';
        data.recurrence_byMonth = rruleObj.BYMONTH ? rruleObj.BYMONTH : '';
        data.recurrence_byMonthDay = rruleObj.BYMONTHDAY ? rruleObj.BYMONTHDAY : '';
        data.recurrence_interval = rruleObj.INTERVAL ? rruleObj.INTERVAL : 1;
        data.recurrence_frequency = rruleObj.FREQ ? rruleObj.FREQ : '';
      } else {
        data.recurrence_simplyfied = true;
        if (!data.recurrence_interval || data.recurrence_interval === '') {
          data.recurrence_interval = 1;
        }
        if (!data.recurrence_weekstart || (data.recurrence_weekstart === '') | (data.recurrence_weekstart.length > 2)) {
          data.recurrence_weekstart = 'MO';
        }
        data.recurrence_frequency = data.recurrence;
        data.recurrence = 'RRULE:FREQ=' + data.recurrence + ';WKST=' + data.recurrence_weekstart + ';INTERVAL=' + data.recurrence_interval;
        if (data.recurrence_until && data.recurrence_until !== '') {
          if (data.endTime && data.endTime !== '') {
            data.recurrence = data.recurrence + ';UNTIL=' + data.recurrence_until.replace(/-/g, '').slice(0, 8) + 'T' + data.endTime.replace(':', '') + '00';
          } else {
            data.recurrence = data.recurrence + ';UNTIL=' + data.recurrence_until.replace(/-/g, '').slice(0, 8);
          }
        }
        if (data.recurrence_count && data.recurrence_count !== '') {
          data.recurrence = data.recurrence + ';COUNT=' + data.recurrence_count;
        }
        if (data.recurrence_byDay && data.recurrence_byDay !== '') {
          data.recurrence = data.recurrence + ';BYDAY=' + data.recurrence_byDay;
        }
        if (data.recurrence_byMonth && data.recurrence_byMonth !== '') {
          data.recurrence = data.recurrence + ';BYMONTH=' + data.recurrence_byMonth;
        }
        if (data.recurrence_byMonthDay && data.recurrence_byMonthDay !== '') {
          data.recurrence = data.recurrence + ';BYMONTHDAY=' + data.recurrence_byMonthDay;
        }
      }
    }
  }
  return data;
}
function atcb_decorate_data_options(data) {
  const theOptions = atcb_determine_options_source(data);
  let { newOptions, iCalGiven, appleGiven } = atcb_process_options(theOptions, data);
  newOptions = atcb_handle_special_google_calendar_case(data, newOptions);
  ({ newOptions, iCalGiven } = atcb_ensure_fallback_options(newOptions, data, iCalGiven));
  newOptions = atcb_adjust_platform_specific_options(newOptions, data, iCalGiven, appleGiven);
  newOptions.sort();
  data.options = newOptions;
  return data;
}
function atcb_determine_options_source(data) {
  if (atcbIsiOS() || data.fakeIOS) {
    if (data.optionsIOS && data.optionsIOS.length > 0) {
      return data.optionsIOS;
    }
    if (data.optionsMobile && data.optionsMobile.length > 0) {
      return data.optionsMobile;
    }
  }
  if ((atcbIsAndroid() || data.fakeMobile || data.fakeAndroid) && data.optionsMobile && data.optionsMobile.length > 0) {
    return data.optionsMobile;
  }
  return data.options || ['ical'];
}
function atcb_process_options(theOptions, data) {
  let newOptions = [];
  let iCalGiven = false;
  let appleGiven = false;
  for (let i = 0; i < theOptions.length; i++) {
    const optionName = atcb_normalize_option_name(theOptions[`${i}`]);
    if (optionName === 'apple') appleGiven = true;
    if (optionName === 'ical') iCalGiven = true;
    if (atcb_should_skip_option(optionName, data)) {
      continue;
    }
    newOptions.push(optionName);
  }
  return { newOptions, iCalGiven, appleGiven };
}
function atcb_normalize_option_name(option) {
  const cleanOption = option.split('|');
  return cleanOption[0].toLowerCase().replace('microsoft', 'ms').replace(/\./, '');
}
function atcb_should_skip_option(optionName, data) {
  return atcb_is_platform_invalid_option(optionName, data) || atcb_is_recurrence_invalid_option(optionName, data) || atcb_is_subscription_invalid_option(optionName, data) || atcb_is_microsoft_mobile_subscription_case(optionName, data);
}
function atcb_is_platform_invalid_option(optionName, data) {
  const isIOSWithInvalidOption = (atcbIsiOS() || data.fakeIOS) && atcbIOSInvalidOptions.includes(optionName) && (!data.optionsIOS || data.optionsIOS.length === 0);
  const isAndroidWithInvalidOption = (atcbIsAndroid() || data.fakeMobile || data.fakeAndroid) && atcbAndroidInvalidOptions.includes(optionName) && (!data.optionsMobile || data.optionsMobile.length === 0);
  return isIOSWithInvalidOption || isAndroidWithInvalidOption;
}
function atcb_is_recurrence_invalid_option(optionName, data) {
  if (!data.recurrence || data.recurrence === '') return false;
  const isInvalidForRecurrence = !atcbValidRecurrOptions.includes(optionName);
  const isAppleOrIcalWithUntil = data.recurrence_until && data.recurrence_until !== '' && (optionName === 'apple' || optionName === 'ical');
  const isGoogleOnIOS = (atcbIsiOS() || data.fakeIOS) && optionName === 'google';
  return isInvalidForRecurrence || isAppleOrIcalWithUntil || isGoogleOnIOS;
}
function atcb_is_subscription_invalid_option(optionName, data) {
  return data.subscribe && atcbInvalidSubscribeOptions.includes(optionName);
}
function atcb_is_microsoft_mobile_subscription_case(optionName, data) {
  return (atcbIsMobile() || data.fakeMobile) && data.subscribe && (optionName === 'ms365' || optionName === 'outlookcom');
}
function atcb_handle_special_google_calendar_case(data, newOptions) {
  if (data.subscribe && data.icsFile && data.icsFile.startsWith('https://calendar.google.com/calendar/') && !data.icsFile.endsWith('.ics')) {
    return ['google'];
  }
  return newOptions;
}
function atcb_ensure_fallback_options(newOptions, data, iCalGiven) {
  if (newOptions.length === 0) {
    if (!(atcbIsiOS() && !data.fakeIOS)) {
      newOptions.push('ical');
    }
    iCalGiven = true;
  }
  return { newOptions, iCalGiven };
}
function atcb_adjust_platform_specific_options(newOptions, data, iCalGiven, appleGiven) {
  if ((atcbIsiOS() || data.fakeIOS) && iCalGiven && !appleGiven) {
    newOptions.push('apple');
  }
  if ((atcbIsAndroid() || data.fakeMobile || data.fakeAndroid) && appleGiven && !iCalGiven) {
    newOptions.push('ical');
  }
  return newOptions;
}
function atcb_decorate_data_style(data) {
  if (data.inlineRSVP) {
    data.inline = true;
  }
  if (!data.listStyle || data.listStyle === '') {
    data.listStyle = 'dropdown';
  }
  if (data.listStyle === 'modal') {
    data.trigger = 'click';
  }
  if (data.buttonStyle && data.buttonStyle !== '' && data.buttonStyle != 'default') {
    if (data.buttonStyle == 'simple' || data.buttonStyle == 'round' || data.buttonStyle == 'text' || data.buttonStyle == 'date' || data.buttonStyle == 'neumorphism') {
      data.trigger = 'click';
    }
  } else {
    data.buttonStyle = 'default';
  }
  if ((data.buttonStyle == 'default' || data.buttonStyle == '3d' || data.buttonStyle == 'flat') && !data.hideTextLabelList && data.hideTextLabelButton && (data.listStyle == 'dropdown' || data.listStyle == 'dropdown-static' || data.listStyle == 'dropup-static')) {
    data.listStyle = 'overlay';
  }
  if (data.buttonsList && data.buttonStyle == 'date') {
    data.buttonsList = false;
  }
  return data;
}
function atcb_decorate_sizes(size) {
  const sizes = [];
  sizes['l'] = sizes['m'] = sizes['s'] = 16;
  if (size && size !== '') {
    const sizeParts = size.split('|');
    for (let i = 0; i < sizeParts.length; i++) {
      sizeParts[`${i}`] = parseInt(sizeParts[`${i}`]);
    }
    if (sizeParts[0] >= 0 && sizeParts[0] < 11) {
      sizes['l'] = sizes['m'] = sizes['s'] = 10 + sizeParts[0];
    }
    if (sizeParts.length > 2) {
      if (sizeParts[1] >= 0 && sizeParts[1] < 11) {
        sizes['m'] = 10 + sizeParts[1];
      }
      if (sizeParts[2] >= 0 && sizeParts[2] < 11) {
        sizes['s'] = 10 + sizeParts[2];
      }
    } else if (sizeParts.length == 2) {
      if (sizeParts[1] >= 0 && sizeParts[1] < 11) {
        sizes['m'] = sizes['s'] = 10 + sizeParts[1];
      }
    }
  }
  return sizes;
}
function atcb_decorate_light_mode(lightMode = '') {
  if (lightMode == 'system' && atcbIsBrowser()) {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }
  if (lightMode != 'bodyScheme' && lightMode != 'dark') {
    return 'light';
  }
  return lightMode;
}
function atcb_decorate_data_i18n(data) {
  if (data.language.length > 2) {
    data.language = data.language.substring(0, 2);
  }
  if (rtlLanguages.includes(data.language)) {
    data.rtl = true;
  } else {
    data.rtl = false;
  }
  return data;
}
function atcb_decorate_data_dates(data) {
  if (!data.dates || !Array.isArray(data.dates)) {
    data.dates = [{ name: data.name }];
  }
  if (data.recurrence && data.recurrence !== '') {
    data.dates[0].recurrence = data.recurrence;
  }
  for (let i = 0; i < data.dates.length; i++) {
    data = atcb_move_root_values_into_dates(data, i);
    data = atcb_dates_cleanup(data, i);
    data = atcb_generate_unique_uid(data, i);
    data = atcb_transform_strings(data, i);
    data = atcb_decorate_data_description(data, i);
    data = atcb_replace_custom_variables(data, i);
    data = atcb_set_online_event_flag(data, i);
  }
  const now = new Date();
  if (!data.created || data.created === '') {
    data.created = atcb_format_datetime(now, 'clean', true);
  }
  if (!data.updated || data.updated === '') {
    data.updated = atcb_format_datetime(now, 'clean', true);
  }
  if (data.dates.length > 1) {
    data.dates.sort((a, b) => a.timestamp - b.timestamp);
  }
  return data;
}
function atcb_move_root_values_into_dates(data, i) {
  const dateEntry = data.dates[`${i}`];
  const properties = ['description', 'startDate', 'startTime', 'endDate', 'endTime', 'timeZone', 'useUserTZ', 'location', 'status', 'sequence', 'availability', 'organizer', 'attendee'];
  if (data.dates.length === 1) {
    properties.unshift('name');
  }
  properties.forEach((prop) => {
    if ((data[`${prop}`] && data[`${prop}`] !== '') || (prop === 'sequence' && data[`${prop}`] === 0)) {
      dateEntry[`${prop}`] = data[`${prop}`];
    }
  });
  return data;
}
function atcb_dates_cleanup(data, i) {
  const dateEntry = data.dates[`${i}`];
  const cleanedUpDates = atcb_date_cleanup(dateEntry);
  dateEntry.startDate = cleanedUpDates.startDate;
  dateEntry.endDate = cleanedUpDates.endDate;
  dateEntry.startTime = cleanedUpDates.startTime;
  dateEntry.endTime = cleanedUpDates.endTime;
  dateEntry.timeZone = cleanedUpDates.timeZone;
  dateEntry.timestamp = atcb_date_specials_calculation('timestamp', dateEntry.startDate, dateEntry.startTime, dateEntry.timeZone);
  dateEntry.overdue = atcb_date_specials_calculation('overdue', dateEntry.endDate, dateEntry.endTime, dateEntry.timeZone);
  return data;
}
function atcb_generate_unique_uid(data, i) {
  const dateEntry = data.dates[`${i}`];
  if (!dateEntry.uid) {
    if (i === 0 && data.uid && data.uid !== '') {
      dateEntry.uid = data.uid;
    } else if (data.uid && data.uid !== '') {
      dateEntry.uid = `${data.uid}-${i + 1}`;
    } else {
      dateEntry.uid = atcb_generate_uuid();
    }
  }
  return data;
}
function atcb_transform_strings(data, i) {
  const dateEntry = data.dates[`${i}`];
  dateEntry.status = atcb_apply_transformation(dateEntry.status, 'upper');
  dateEntry.availability = atcb_apply_transformation(dateEntry.availability, 'lower');
  return data;
}
function atcb_decorate_data_description(data, i) {
  const cleanDescription = (desc) => desc.replace(/(\\r\\n|\\n|\\r|<br(\s*\/?)>)/g, '');
  let description = data.dates[`${i}`].description;
  if (description) {
    description = cleanDescription(description);
    const descriptionHtmlFree = atcb_rewrite_html_elements(description, true);
    const descriptionHtmlFreeICal = atcb_rewrite_html_elements(description, true, true);
    description = atcb_rewrite_html_elements(description);
    data.dates[`${i}`] = { ...data.dates[`${i}`], description, descriptionHtmlFree, descriptionHtmlFreeICal };
  } else {
    data.dates[`${i}`].descriptionHtmlFree = data.dates[`${i}`].descriptionHtmlFreeICal = data.dates[`${i}`].description = '';
  }
  return data;
}
function atcb_set_online_event_flag(data, i) {
  const dateEntry = data.dates[`${i}`];
  if (dateEntry.location && dateEntry.location.startsWith('http')) {
    dateEntry.onlineEvent = true;
  } else {
    dateEntry.v = false;
  }
  return data;
}
function atcb_replace_custom_variables(data, i) {
  if (!data.customVar) return data;
  const dateEntry = data.dates[`${i}`];
  for (const key in data.customVar) {
    const value = data.customVar[`${key}`];
    dateEntry.name = atcb_replace_placeholder(dateEntry.name, value);
    dateEntry.location = atcb_replace_placeholder(dateEntry.location, value);
  }
  return data;
}
function atcb_replace_placeholder(text, value) {
  const placeholder = '%%' + key.replace(/[^\w\-.]/g, '') + '%%';
  if (!text) return text;
  // eslint-disable-next-line security/detect-non-literal-regexp
  return text.replace(new RegExp(placeholder, 'gi'), value);
}
function atcb_date_cleanup(dateTimeData) {
  function isValidDateFormat(dateStr) {
    return /^\d\d\d\d-\d\d-\d\d(?:T\d\d:\d\d)?(?::\d\d)?(?:.\d\d\d)?Z?(?:\+(?:\d|\d\d|\d\d\d|\d\d\d\d))?$/i.test(dateStr);
  }
  function isValidTodayFormat(dateStr) {
    return /^today(?:\+(?:\d|\d\d|\d\d\d|\d\d\d\d))?$/i.test(dateStr);
  }
  if (!dateTimeData.endDate || dateTimeData.endDate === '') {
    dateTimeData.endDate = dateTimeData.startDate;
  }
  const endpoints = ['start', 'end'];
  endpoints.forEach(function (point) {
    const dateStr = dateTimeData[point + 'Date'];
    if (!isValidDateFormat(dateStr) && !isValidTodayFormat(dateStr)) {
      dateTimeData[point + 'Date'] = 'badly-formed';
    } else {
      if (/\+/.test(dateStr) || isValidTodayFormat(dateStr)) dateTimeData[point + 'Date'] = atcb_date_calculation(dateStr);
      if (dateTimeData[point + 'Date']) {
        const tmpSplitStartDate = dateTimeData[point + 'Date'].split('T');
        if (tmpSplitStartDate[1]) {
          dateTimeData[point + 'Date'] = tmpSplitStartDate[0];
          dateTimeData[point + 'Time'] = tmpSplitStartDate[1];
        }
      }
      if (dateTimeData[point + 'Time'] && dateTimeData[point + 'Time'].length > 5) {
        dateTimeData[point + 'Time'] = dateTimeData[point + 'Time'].substring(0, 5);
      }
    }
  });
  if (dateTimeData.timeZone === 'currentBrowser' || dateTimeData.useUserTZ) {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'GMT';
    if (dateTimeData.useUserTZ && dateTimeData.startTime && dateTimeData.startTime !== '' && dateTimeData.endTime && dateTimeData.endTime !== '') {
      const newStartDateTime = atcb_translate_via_time_zone(dateTimeData.startDate, dateTimeData.startTime, dateTimeData.timeZone, browserTimezone);
      const newEndDateTime = atcb_translate_via_time_zone(dateTimeData.endDate, dateTimeData.endTime, dateTimeData.timeZone, browserTimezone);
      dateTimeData.startDate = newStartDateTime[0];
      dateTimeData.startTime = newStartDateTime[1];
      dateTimeData.endDate = newEndDateTime[0];
      dateTimeData.endTime = newEndDateTime[1];
    }
    dateTimeData.timeZone = browserTimezone;
  }
  return dateTimeData;
}
function atcb_date_specials_calculation(type, dateString, timeString = null, timeZone) {
  try {
    const tmpDate = (function () {
      if (timeString) {
        const offsetEnd = tzlib_get_offset(timeZone, dateString, timeString);
        return new Date(dateString + ' ' + timeString + ':00 GMT' + offsetEnd);
      }
      return new Date(dateString);
    })();
    if (type === 'timestamp') {
      return tmpDate.getTime();
    }
    if (!timeString) {
      tmpDate.setDate(tmpDate.getDate() + 1);
    }
    const currentUtcDate = new Date().toISOString();
    return tmpDate.getTime() < new Date(currentUtcDate).getTime();
  } catch {
    return false;
  }
}
function atcb_date_calculation(dateString) {
  const today = new Date();
  const todayString = today.getUTCFullYear() + '-' + (today.getUTCMonth() + 1) + '-' + today.getUTCDate();
  dateString = dateString.replace(/today/gi, todayString);
  const dateStringParts = dateString.split('+');
  const dateParts = dateStringParts[0].split('-');
  const newDate = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2].substring(0, 2)));
  if (dateStringParts[1] && dateStringParts[1] > 0) {
    newDate.setDate(newDate.getDate() + parseInt(dateStringParts[1]));
  }
  try {
    return newDate.toISOString().replace(/T(\d{2}:\d{2}:\d{2}\.\d{3})Z/g, '');
  } catch {
    return false;
  }
}
function atcb_decorate_data_button_status_handling(data) {
  if (!data.pastDateHandling || (data.pastDateHandling != 'disable' && data.pastDateHandling != 'hide')) {
    data.pastDateHandling = 'none';
  }
  data.allOverdue = (function () {
    for (let i = 0; i < data.dates.length; i++) {
      if (!data.dates[`${i}`].overdue) {
        return false;
      }
    }
    return true;
  })();
  if (data.allOverdue) {
    if (data.pastDateHandling == 'disable') {
      data.disabled = true;
    } else if (data.pastDateHandling == 'hide') {
      data.hidden = true;
    }
  }
  data.allCancelled = (function () {
    for (let i = 0; i < data.dates.length; i++) {
      if (!data.dates[`${i}`].status || data.dates[`${i}`].status.toLowerCase() !== 'cancelled') {
        return false;
      }
    }
    return true;
  })();
  if (data.disabled || data.hidden) {
    data.blockInteraction = true;
  }
  return data;
}
async function atcb_decorate_data_rsvp(data) {
  if (typeof atcb_check_bookings !== 'function' || !data.rsvp || !data.proKey || Object.keys(data.rsvp).length === 0) return data;
  data.rsvp.expired = (function () {
    if (data.rsvp && data.rsvp.expires && new Date(data.rsvp.expires) < new Date()) {
      return true;
    }
    return false;
  })();
  if (data.rsvp.max) {
    const bookings = await atcb_check_bookings(data.proKey, data.dev);
    data.rsvp.seatsLeft = data.rsvp.max - bookings;
    if (data.rsvp.seatsLeft < 1) {
      data.rsvp.bookedOut = true;
    }
    if (data.rsvp.expired || data.rsvp.bookedOut) {
      data.blockInteraction = true;
    }
    if (data.blockInteraction) {
      data.disabled = true;
    }
  }
  return data;
}


async function atcb_check_required(data) {
  if ((!data.name || data.name === '') && (!data.dates || data.dates.length === 0)) {
    throw new Error('Add to Calendar Button generation failed: required name information missing');
  }
  if (data.dates && data.dates.length > 0) {
    if (data.subscribe === true && data.dates.length > 1) {
      throw new Error('Add to Calendar Button generation failed: a subscription calendar cannot be a multi-date setup');
    }
    const requiredMultiField = ['name', 'startDate'];
    const requiredMultiFieldFlex = ['name'];
    return requiredMultiField.every(function (field) {
      for (let i = 0; i < data.dates.length; i++) {
        if (
          (!requiredMultiFieldFlex.includes(`${field}`) && (!data.dates[`${i}`][`${field}`] || data.dates[`${i}`][`${field}`] === '')) ||
          (requiredMultiFieldFlex.includes(`${field}`) && (!data.dates[`${i}`][`${field}`] || data.dates[`${i}`][`${field}`] === '') && (!data[`${field}`] || data[`${field}`] === ''))
        ) {
          if (!data.subscribe || field !== 'startDate') {
            throw new Error('Add to Calendar Button generation failed: required setting missing [dates array object #' + (i + 1) + '/' + data.dates.length + '] => [' + field + ']');
          } else {
            data.dates[`${i}`].startDate = 'today';
          }
        }
      }
      return true;
    });
  } else {
    const requiredSingleField = ['startDate'];
    return requiredSingleField.every(function (field) {
      if (!data[`${field}`] || data[`${field}`] === '') {
        if (!data.subscribe || field !== 'startDate') {
          throw new Error('Add to Calendar Button generation failed: required setting missing [' + field + ']');
        } else {
          data.startDate = 'today';
        }
      }
      return true;
    });
  }
}
async function atcb_validate(data) {
  const msgPrefix = 'Add to Calendar Button generation (' + data.identifier + ')';
  try {
    await atcb_validate_icsFile(data, msgPrefix);
    await atcb_validate_buttonStyle(data, msgPrefix);
    await atcb_validate_subscribe(data, msgPrefix);
    await atcb_validate_created(data, msgPrefix);
    await atcb_validate_updated(data, msgPrefix);
    await atcb_validate_options(data, msgPrefix);
    await atcb_validate_date_blocks(data, msgPrefix);
    await atcb_validate_rrule(data, msgPrefix);
    if (data.recurrence_simplyfied) {
      await atcb_validate_rrule_simplyfied(data, msgPrefix);
    }
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
}
async function atcb_validate_icsFile(data, msgPrefix, i = '', msgSuffix = '') {
  const icsFileStr = (function () {
    if (i !== '' && data.dates[`${i}`].icsFile) {
      return data.dates[`${i}`].icsFile;
    }
    if (i === '' && data.icsFile) {
      return data.icsFile;
    }
    return '';
  })();
  if (icsFileStr !== '') {
    if (!atcb_secure_url(icsFileStr, false) || (!data.icsFile.startsWith('https://') && !data.icsFile.startsWith('http://'))) {
      throw new Error(msgPrefix + ' failed: explicit ics file path not valid' + msgSuffix);
    }
  }
  return true;
}
async function atcb_validate_buttonStyle(data, msgPrefix) {
  const availableStyles = ['default', 'simple', '3d', 'flat', 'round', 'neumorphism', 'text', 'date', 'custom', 'none'];
  if (!availableStyles.includes(data.buttonStyle)) {
    throw new Error(msgPrefix + ' failed: provided buttonStyle invalid');
  }
  if (data.customCss && data.customCss !== '' && (!atcb_secure_url(data.customCss, false) || !/\.css(?:$|\?)/.test(data.customCss))) {
    throw new Error(msgPrefix + ' failed: customCss provided, but no valid url');
  }
  if ((!data.customCss || data.customCss === '') && data.buttonStyle === 'custom') {
    throw new Error(msgPrefix + ' failed: buttonStyle "custom" selected, but no customCss file provided');
  }
  if (data.rsvp && (data.buttonStyle === 'date' || data.buttonStyle === 'none')) {
    throw new Error(msgPrefix + ' failed: buttonStyle ' + data.buttonStyle + ' is not compatible with the RSVP functionality');
  }
  return true;
}
async function atcb_validate_subscribe(data, msgPrefix) {
  if (data.subscribe === true && (!data.icsFile || data.icsFile === '')) {
    throw new Error(msgPrefix + ' failed: a subscription calendar requires a valid explicit ics file as well');
  }
  return true;
}
async function atcb_validate_created(data, msgPrefix) {
  if (!/^\d{8}T\d{6}Z$/.test(data.created)) {
    throw new Error(msgPrefix + ' failed: created date format not valid. Needs to be a full ISO-8601 UTC date and time string, formatted YYYYMMDDTHHMMSSZ');
  }
  return true;
}
async function atcb_validate_updated(data, msgPrefix) {
  if (!/^\d{8}T\d{6}Z$/.test(data.updated)) {
    throw new Error(msgPrefix + ' failed: updated date format not valid. Needs to be a full ISO-8601 UTC date and time string, formatted YYYYMMDDTHHMMSSZ');
  }
  return true;
}
async function atcb_validate_options(data, msgPrefix) {
  const isValid = data.options.every((option) => {
    if (!atcbOptions.includes(option)) {
      throw new Error(`${msgPrefix} failed: invalid option [${option}]`);
    }
    return true;
  });
  return isValid;
}
async function atcb_validate_date_blocks(data, msgPrefix) {
  try {
    for (let i = 0; i < data.dates.length; i++) {
      const msgSuffix = (function () {
        if (data.dates.length === 1) {
          return '';
        } else {
          return ' [dates array object #' + (i + 1) + '/' + data.dates.length + '] ';
        }
      })();
      await atcb_validate_icsFile(data, msgPrefix, i, msgSuffix);
      await atcb_validate_status(data, msgPrefix, i, msgSuffix);
      await atcb_validate_availability(data, msgPrefix, i, msgSuffix);
      await atcb_validate_organizer(data, msgPrefix, i, msgSuffix);
      await atcb_validate_attendee(data, msgPrefix, i, msgSuffix);
      await atcb_validate_uid(data, msgPrefix, i, msgSuffix);
      await atcb_validate_sequence(data, msgPrefix, i, msgSuffix);
      await atcb_validate_timezone(data, msgPrefix, i, msgSuffix);
      await atcb_validate_datetime(data, msgPrefix, i, msgSuffix);
    }
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
}
async function atcb_validate_status(data, msgPrefix, i, msgSuffix) {
  const allowedStatuses = ['tentative', 'confirmed', 'cancelled'];
  if (!allowedStatuses.includes(data.dates[`${i}`].status.toLowerCase())) {
    throw new Error(msgPrefix + ' failed: event status needs to be TENTATIVE, CONFIRMED, or CANCELLED' + msgSuffix);
  }
  return true;
}
async function atcb_validate_availability(data, msgPrefix, i, msgSuffix) {
  if (data.dates[`${i}`].availability && data.dates[`${i}`].availability !== '' && data.dates[`${i}`].availability !== 'free' && data.dates[`${i}`].availability !== 'busy') {
    throw new Error(msgPrefix + ' failed: event availability needs to be "free" or "busy"' + msgSuffix);
  }
  return true;
}
async function atcb_validate_organizer(data, msgPrefix, i, msgSuffix) {
  if (data.dates[`${i}`].organizer && data.dates[`${i}`].organizer !== '') {
    const organizerParts = data.dates[`${i}`].organizer.split('|');
    if (organizerParts.length !== 2 || organizerParts[0].length > 50 || organizerParts[1].length > 100 || !atcb_validEmail(organizerParts[1])) {
      throw new Error(msgPrefix + ' failed: organizer needs to match the schema "NAME|EMAIL" with a valid email address, where the name is <50 and email <100 characters' + msgSuffix);
    }
  }
  return true;
}
async function atcb_validate_attendee(data, msgPrefix, i, msgSuffix) {
  if (data.dates[`${i}`].attendee && data.dates[`${i}`].attendee !== '') {
    if (!data.dates[`${i}`].organizer || data.dates[`${i}`].organizer === '') {
      throw new Error(msgPrefix + ' failed: if an attendee is set, you also need to set the organizer' + msgSuffix);
    }
    const attendeeParts = data.dates[`${i}`].attendee.split('|');
    if (attendeeParts.length === 1 && atcb_validEmail(attendeeParts[0])) {
      return true;
    }
    if (attendeeParts.length !== 2 || attendeeParts[0].length > 50 || attendeeParts[1].length > 100 || !atcb_validEmail(attendeeParts[1])) {
      throw new Error(msgPrefix + ' failed: attendee needs to be a valid email address or match the schema "NAME|EMAIL" with EMAIL being a valid email address' + msgSuffix);
    }
  }
  return true;
}
async function atcb_validate_uid(data, msgPrefix, i, msgSuffix) {
  if (!/^(?:\w|-){1,254}$/.test(data.dates[`${i}`].uid)) {
    if (data.debug) {
      console.warn(msgPrefix + ': UID not valid. May only contain alpha, digits, and dashes; and be less than 255 characters. Falling back to an automated value!' + msgSuffix);
    }
    data.dates[`${i}`].uid = atcb_generate_uuid();
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.dates[`${i}`].uid) && data.debug) {
    console.warn(msgPrefix + ': UID is highly recommended to be a hex-encoded random Universally Unique Identifier (UUID)!' + msgSuffix);
  }
  return true;
}
async function atcb_validate_sequence(data, msgPrefix, i, msgSuffix) {
  if (data.dates[`${i}`].sequence && (data.dates[`${i}`].sequence < 0 || data.dates[`${i}`].sequence % 1 !== 0)) {
    if (data.debug) {
      console.log(msgPrefix + ': sequence needs to be a full number >= 0. Used the default 0 instead' + msgSuffix);
    }
    data.dates[`${i}`].sequence = 0;
  }
  return true;
}
async function atcb_validate_timezone(data, msgPrefix, i, msgSuffix) {
  const validTimeZones = tzlib_get_timezones();
  if (!validTimeZones.includes(data.dates[`${i}`].timeZone)) {
    throw new Error(msgPrefix + ' failed: invalid time zone given' + msgSuffix);
  }
  return true;
}
async function atcb_validate_datetime(data, msgPrefix, i, msgSuffix) {
  const selectedDate = data.dates[`${i}`];
  const dates = ['startDate', 'endDate'];
  const newDate = {};
  dates.forEach((date) => {
    const dateString = selectedDate[`${date}`];
    if (dateString.length !== 10) {
      throw new Error(`${msgPrefix} failed: date misspelled [-> YYYY-MM-DD]${msgSuffix}`);
    }
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
      throw new Error(`${msgPrefix} failed: date misspelled [${date}: ${dateString}]${msgSuffix}`);
    }
    newDate[`${date}`] = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  });
  const times = ['startTime', 'endTime'];
  times.forEach((time) => {
    const timeString = selectedDate[`${time}`];
    if (timeString) {
      if (timeString.length !== 5) {
        throw new Error(`${msgPrefix} failed: time misspelled [-> HH:MM]${msgSuffix}`);
      }
      const timeParts = timeString.split(':');
      if (timeParts.length !== 2 || timeParts[0] > 23 || timeParts[1] > 59) {
        throw new Error(`${msgPrefix} failed: time misspelled [${time}: ${timeString}]${msgSuffix}`);
      }
      const dateKey = time === 'startTime' ? 'startDate' : 'endDate';
      newDate[`${dateKey}`] = new Date(newDate[`${dateKey}`].getTime() + parseInt(timeParts[0], 10) * 3600000 + parseInt(timeParts[1], 10) * 60000);
    }
  });
  if ((selectedDate.startTime && !selectedDate.endTime) || (!selectedDate.startTime && selectedDate.endTime)) {
    throw new Error(`${msgPrefix} failed: if you set a starting or end time, the respective other one also needs to be defined${msgSuffix}`);
  }
  if (newDate.endDate < newDate.startDate) {
    throw new Error(`${msgPrefix} failed: end date before start date${msgSuffix}`);
  }
  return true;
}
async function atcb_validate_rrule(data, msgPrefix) {
  if (data.recurrence && data.recurrence !== '' && data.dates.length > 1) {
    throw new Error(msgPrefix + ' failed: RRULE and multi-date set at the same time');
  }
  if (data.recurrence && data.recurrence !== '' && !/^RRULE:[\w=;,:+\-/\\]+$/i.test(data.recurrence)) {
    throw new Error(msgPrefix + ' failed: RRULE data misspelled');
  }
  return true;
}
async function atcb_validate_rrule_simplyfied(data, msgPrefix) {
  if (data.recurrence_interval && (data.recurrence_interval < 1 || data.recurrence_interval % 1 !== 0)) {
    throw new Error(msgPrefix + ' failed: recurrence data (interval) misspelled');
  }
  if (data.recurrence_until && data.recurrence_until !== '' && !/^[\d\-:]+$/.test(data.recurrence_until)) {
    throw new Error(msgPrefix + ' failed: recurrence data (until) misspelled');
  }
  if (data.recurrence_count && (data.recurrence_count < 1 || data.recurrence_count % 1 !== 0)) {
    throw new Error(msgPrefix + ' failed: recurrence data (interval) misspelled');
  }
  if (data.recurrence_byMonth && data.recurrence_byMonth !== '' && !/^[\d,]+$/.test(data.recurrence_byMonth)) {
    throw new Error(msgPrefix + ' failed: recurrence data (byMonth) misspelled');
  }
  if (data.recurrence_byMonthDay && data.recurrence_byMonthDay !== '' && !/^[\d,]+$/.test(data.recurrence_byMonthDay)) {
    throw new Error(msgPrefix + ' failed: recurrence data (byMonthDay) misspelled');
  }
  if (data.recurrence_byDay && data.recurrence_byDay !== '' && !/^(?:[\d,-]|MO|TU|WE|TH|FR|SA|SU)+$/im.test(data.recurrence_byDay)) {
    throw new Error(msgPrefix + ' failed: recurrence data (byDay) misspelled');
  }
  if (data.recurrence_weekstart && data.recurrence_weekstart !== '' && !/^(?:MO|TU|WE|TH|FR|SA|SU)$/im.test(data.recurrence_weekstart)) {
    throw new Error(msgPrefix + ' failed: recurrence data (weekstart) misspelled');
  }
  return true;
}


function atcb_toggle(host, action, data = '', button = null, keyboardTrigger = false, generatedButton = false) {
  if (action == 'open') {
    atcb_open(host, data, button, keyboardTrigger, generatedButton);
  } else if (action == 'close' || button.classList.contains('atcb-active') || host.querySelector('.atcb-active-modal')) {
    atcb_close(host, keyboardTrigger);
  } else {
    atcb_open(host, data, button, keyboardTrigger, generatedButton);
  }
}
async function atcb_open(host, data, button = null, keyboardTrigger = false, generatedButton = false) {
  if (host.querySelector('.atcb-list') || host.querySelector('.atcb-modal')) return;
  atcb_log_event('openList', data.identifier, data.identifier);
  atcbStates['active'] = data.identifier;
  const list = atcb_generate_dropdown_list(host, data);
  const listWrapper = document.createElement('div');
  listWrapper.classList.add('atcb-list-wrapper');
  listWrapper.setAttribute('part', 'atcb-list-wrapper');
  if (data.hideTextLabelList) {
    listWrapper.classList.add('atcb-no-text');
  }
  if (button) {
    button.classList.add('atcb-active');
    button.setAttribute('aria-expanded', true);
    if (data.listStyle === 'modal') {
      button.classList.add('atcb-modal-style');
      list.classList.add('atcb-modal');
    } else {
      listWrapper.append(list);
      listWrapper.classList.add('atcb-dropdown');
      if (data.listStyle === 'overlay') {
        listWrapper.classList.add('atcb-dropoverlay');
      }
    }
    if (generatedButton) {
      list.classList.add('atcb-generated-button'); 
    }
  } else {
    list.classList.add('atcb-modal');
  }
  const bgOverlay = atcb_generate_bg_overlay(host, data.trigger, data.listStyle === 'modal', !data.hideBackground);
  if (data.listStyle === 'modal') {
    const modalHost = await atcb_generate_modal_host(host, data);
    modalHost.querySelector('.atcb-modal-host-initialized').append(bgOverlay);
    bgOverlay.append(list);
    if (!data.hideBranding) {
      atcb_create_atcbl(modalHost, false);
    }
    atcb_set_sizes(list, data.sizes);
    atcb_manage_body_scroll(modalHost);
    atcb_set_fullsize(bgOverlay);
  } else {
    if (data.forceOverlay) {
      host = await atcb_generate_overlay_dom(host, data);
      button = host.querySelector('button.atcb-button');
    }
    host.querySelector('.atcb-initialized').append(listWrapper);
    listWrapper.append(list);
    if (data.buttonStyle != 'default') {
      listWrapper.classList.add('atcb-style-' + data.buttonStyle);
    }
    if (!data.hideBranding) {
      atcb_create_atcbl(host);
    }
    host.append(bgOverlay);
    atcb_set_sizes(list, data.sizes);
    listWrapper.style.display = 'none';
    setTimeout(function () {
      listWrapper.style.display = 'block';
      if (data.listStyle === 'dropdown-static') {
        atcb_position_list(host, button, listWrapper, true);
      } else if (data.listStyle === 'dropup-static') {
        atcb_position_list(host, button, listWrapper, false, true);
      } else {
        atcb_position_list(host, button, listWrapper);
      }
    }, 5);
    atcb_set_fullsize(bgOverlay);
  }
  const focusEl = (function () {
    const hostEl = host.querySelector('.atcb-list-item');
    if (hostEl) {
      return hostEl;
    }
    const modalHost = document.getElementById(data.identifier + '-modal-host');
    if (!modalHost) {
      return;
    }
    return modalHost.shadowRoot.querySelector('.atcb-list-item');
  })();
  if (focusEl) {
    if (keyboardTrigger) {
      focusEl.focus();
    } else {
      focusEl.focus({ preventScroll: true });
      focusEl.blur();
    }
  }
}
function atcb_close(host, keyboardTrigger = false) {
  const existingModalHost = document.getElementById(host.host.getAttribute('atcb-button-id') + '-modal-host');
  const allModals = (function () {
    if (!existingModalHost || existingModalHost.length === 0) {
      return [];
    }
    return existingModalHost.shadowRoot.querySelectorAll('.atcb-modal[data-modal-nr]');
  })();
  if (allModals.length > 1) {
    existingModalHost.shadowRoot.querySelectorAll('.atcb-modal[data-modal-nr="' + allModals.length + '"]')[0].remove();
    const nextModal = existingModalHost.shadowRoot.querySelectorAll('.atcb-modal[data-modal-nr="' + (allModals.length - 1) + '"]')[0];
    nextModal.classList.remove('atcb-hidden');
    let focusEl = nextModal;
    const availableButtons = nextModal.getElementsByTagName('button');
    if (availableButtons.length > 0) {
      focusEl = availableButtons[0];
    }
    focusEl.focus();
    if (!keyboardTrigger) {
      focusEl.blur();
    }
  } else {
    const newFocusEl = (function () {
      const hostEl = host.querySelector('.atcb-active, .atcb-active-modal');
      if (hostEl) {
        return hostEl;
      }
      return document.querySelector('.atcb-active, .atcb-active-modal');
    })();
    if (newFocusEl) {
      newFocusEl.focus({ preventScroll: true });
      if (!keyboardTrigger) {
        newFocusEl.blur();
      }
    }
    Array.from(host.querySelectorAll('.atcb-active')).forEach((button) => {
      button.classList.remove('atcb-active');
      button.setAttribute('aria-expanded', false);
    });
    Array.from(host.querySelectorAll('.atcb-active-modal')).forEach((modal) => {
      modal.classList.remove('atcb-active-modal');
    });
    Array.from(document.querySelectorAll('.atcb-active')).forEach((button) => {
      button.classList.remove('atcb-active');
      button.setAttribute('aria-expanded', false);
    });
    Array.from(document.querySelectorAll('.atcb-active-modal')).forEach((modal) => {
      modal.classList.remove('atcb-active-modal');
    });
    if (existingModalHost) {
      existingModalHost.remove();
    }
    document.body.classList.remove('atcb-modal-no-scroll');
    document.documentElement.classList.remove('atcb-modal-no-scroll');
    Array.from(host.querySelectorAll('.atcb-list-wrapper'))
      .concat(Array.from(host.querySelectorAll('.atcb-list')))
      .concat(Array.from(host.querySelectorAll('#atcb-reference')))
      .concat(Array.from(host.querySelectorAll('#atcb-bgoverlay')))
      .forEach((el) => el.remove());
    const hiddenButton = document.querySelector('.atcb-shadow-hide');
    if (hiddenButton) {
      hiddenButton.shadowRoot.querySelector('.atcb-initialized').style.opacity = '1';
      hiddenButton.classList.remove('atcb-shadow-hide');
      window.removeEventListener('scroll', atcb_position_shadow_button_listener);
      window.removeEventListener('resize', atcb_position_shadow_button_listener);
    }
    atcbStates['active'] = '';
  }
}


function atcb_generate_label(host, data, parent, type, icon = false, text = '', oneOption = false) {
  switch (type) {
    case 'trigger':
    case 'rsvp':
    default:
      parent.id = data.identifier;
      if (!data.blockInteraction) {
        parent.addEventListener('keyup', function (event) {
          if (event.key === 'Enter' || event.code == 'Space' || (event.key === 'Alt' && event.key === 'Control' && event.code === 'Space')) {
            event.preventDefault();
            if (type === 'rsvp' && typeof atcb_generate_rsvp_form === 'function') {
              atcb_generate_rsvp_form(host, data, parent, true);
            } else {
              atcb_toggle(host, 'auto', data, parent, true, true);
            }
          }
        });
        parent.addEventListener(
          'touchend',
          atcb_debounce_leading((event) => {
            event.preventDefault();
            if (type === 'rsvp' && typeof atcb_generate_rsvp_form === 'function') {
              atcb_generate_rsvp_form(host, data, parent);
            } else {
              atcb_toggle(host, 'auto', data, parent, false, true);
            }
          }),
        );
        if (data.trigger === 'click' || (type === 'rsvp' && typeof atcb_generate_rsvp_form === 'function')) {
          parent.addEventListener(
            'mouseup',
            atcb_debounce_leading((event) => {
              event.preventDefault();
              if (type === 'rsvp' && typeof atcb_generate_rsvp_form === 'function') {
                atcb_generate_rsvp_form(host, data, parent);
              } else {
                atcb_toggle(host, 'auto', data, parent, false, true);
              }
            }),
          );
        } else {
          parent.addEventListener('mouseenter', function () {
            atcb_toggle(host, 'open', data, parent, false, true);
          });
        }
      }
      break;
    case 'apple':
    case 'google':
    case 'ical':
    case 'msteams':
    case 'ms365':
    case 'outlookcom':
    case 'yahoo':
      parent.id = data.identifier + '-' + type;
      if (!data.blockInteraction) {
        parent.addEventListener(
          'click',
          atcb_debounce_leading(() => {
            if (oneOption) {
              host.querySelector('#' + parent.id)?.blur();
              atcb_log_event('openSingletonLink', parent.id, data.identifier);
            } else {
              atcb_toggle(host, 'close');
              atcb_log_event('openCalendarLink', parent.id, data.identifier);
            }
            atcb_generate_links(host, type, data);
          }),
        );
        parent.addEventListener('keyup', function (event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            if (oneOption) {
              host.querySelector('#' + parent.id)?.blur();
              atcb_log_event('openSingletonLink', parent.id, data.identifier);
            } else {
              atcb_toggle(host, 'close');
              atcb_log_event('openCalendarLink', parent.id, data.identifier);
            }
            atcb_generate_links(host, type, data, 'all', true);
          }
        });
      }
      break;
    case 'close':
      parent.id = data.identifier + '-close';
      parent.addEventListener(
        'click',
        atcb_debounce(() => {
          atcb_log_event('closeList', 'List Close Button', atcbStates['active']);
          atcb_toggle(host, 'close');
        }),
      );
      parent.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          atcb_log_event('closeList', 'List Close Button', atcbStates['active']);
          atcb_toggle(host, 'close', data, 'all', true);
        }
      });
      break;
  }
  atcb_generate_label_content(data, parent, type, icon, text, oneOption);
}
function atcb_generate_label_content(data, parent, type, icon, text, oneOption) {
  if (!data.buttonsList && oneOption) type = 'trigger';
  const defaultTriggerText = (function () {
    if (data.pastDateHandling != 'none') {
      let allOverdue = true;
      for (let i = 0; i < data.dates.length; i++) {
        if (!data.dates[`${i}`].overdue) {
          allOverdue = false;
          break;
        }
      }
      if (allOverdue) {
        return atcb_translate_hook('expired', data);
      }
    }
    return atcb_translate_hook('label.addtocalendar', data);
  })();
  if (text === '') {
    if (data.options.length === 1 || type === 'trigger') {
      text = defaultTriggerText;
    } else if (type === 'close') {
      text = atcb_translate_hook('close', data);
    } else {
      text = atcb_translate_hook(type, data);
    }
  }
  if (data.buttonStyle === 'date' && (type === 'trigger' || oneOption)) {
    return;
  }
  parent.setAttribute('aria-label', oneOption ? atcb_translate_hook('label.addtocalendar', data) + ' (' + atcb_translate_hook(type, data) + '): ' + data.name : type === 'trigger' ? text + ': ' + data.name : text);
  if (icon) {
    const iconEl = document.createElement('div');
    iconEl.classList.add('atcb-icon');
    iconEl.setAttribute('part', type === 'trigger' ? 'atcb-button-icon' : 'atcb-list-icon');
    iconEl.classList.add(`atcb-icon-${type}`);
    iconEl.innerHTML = atcbIcon[`${type}`];
    parent.append(iconEl);
  }
  if (((type === 'trigger' || oneOption) && !data.hideTextLabelButton) || (!oneOption && type !== 'trigger' && !data.hideTextLabelList)) {
    const textEl = document.createElement('span');
    textEl.classList.add('atcb-text');
    textEl.setAttribute('part', type === 'trigger' ? 'atcb-button-text' : 'atcb-list-text');
    textEl.textContent = text;
    parent.append(textEl);
  }
}
function atcb_generate_button(host, button, data) {
  const oneOption = (function () {
    if (data.options.length === 1 || (data.buttonsList && data.buttonStyle != 'date')) {
      return true;
    }
    return false;
  })();
  const optionSplit = oneOption ? data.options : ['default'];
  optionSplit.forEach(function (option, index) {
    const buttonTriggerWrapper = document.createElement('div');
    buttonTriggerWrapper.classList.add('atcb-button-wrapper');
    buttonTriggerWrapper.setAttribute('part', 'atcb-button-wrapper');
    if (data.rtl) {
      buttonTriggerWrapper.classList.add('atcb-rtl');
    }
    button.append(buttonTriggerWrapper);
    atcb_set_sizes(buttonTriggerWrapper, data.sizes);
    const buttonTrigger = document.createElement('button');
    buttonTrigger.classList.add('atcb-button');
    buttonTrigger.setAttribute('part', 'atcb-button');
    if (data.disabled) {
      buttonTrigger.setAttribute('disabled', true);
    }
    if (data.hideTextLabelButton) {
      buttonTrigger.classList.add('atcb-no-text');
    }
    if (data.trigger === 'click') {
      buttonTrigger.classList.add('atcb-click');
    }
    if (data.listStyle === 'overlay') {
      buttonTrigger.classList.add('atcb-dropoverlay');
    }
    buttonTrigger.type = 'button';
    buttonTrigger.setAttribute('aria-expanded', false); 
    buttonTriggerWrapper.append(buttonTrigger);
    if (data.buttonStyle === 'date') {
      atcb_generate_date_button(data, buttonTrigger, 'all', oneOption);
    }
    if (oneOption) {
      buttonTrigger.classList.add('atcb-single');
      const label = (function () {
        if (data.buttonsList && data.options.length > 1) {
          return atcb_translate_hook(`${data.options[`${index}`]}`, data);
        }
        return data.label;
      })();
      atcb_generate_label(host, data, buttonTrigger, option, !data.hideIconButton, label, true);
      buttonTrigger.id = data.identifier;
      if (data.buttonsList) {
        buttonTrigger.id = data.identifier + '-' + option;
      }
    } else {
      atcb_generate_label(host, data, buttonTrigger, 'trigger', !data.hideIconButton, data.label);
      const buttonDropdownAnchor = document.createElement('div');
      buttonDropdownAnchor.classList.add('atcb-dropdown-anchor');
      buttonTrigger.append(buttonDropdownAnchor);
    }
    if (!data.hideCheckmark && !data.hideTextLabelButton && !data.buttonsList && !data.disabled && !data.allCancelled) {
      const btnCheck = document.createElement('div');
      btnCheck.classList.add('atcb-checkmark');
      btnCheck.innerHTML = atcbIcon['checkmark'];
      buttonTrigger.append(btnCheck);
    }
  });
  if (data.debug) {
    console.log('Add to Calendar Button "' + data.identifier + '" created');
  }
}
function atcb_generate_dropdown_list(host, data) {
  const optionsList = document.createElement('div');
  optionsList.classList.add('atcb-list');
  optionsList.setAttribute('part', 'atcb-list');
  optionsList.role = 'list';
  if (data.rtl) {
    optionsList.classList.add('atcb-rtl');
  }
  let listCount = 0;
  data.options.forEach(function (option) {
    const optionItem = document.createElement('div');
    optionItem.classList.add('atcb-list-item');
    optionItem.setAttribute('part', 'atcb-list-item');
    optionItem.role = 'link';
    optionItem.tabIndex = 0;
    listCount++;
    optionItem.dataset.optionNumber = listCount;
    optionsList.append(optionItem);
    atcb_generate_label(host, data, optionItem, option, !data.hideIconList);
  });
  if (data.listStyle === 'modal') {
    const optionItem = document.createElement('div');
    optionItem.classList.add('atcb-list-item', 'atcb-list-item-close');
    optionItem.setAttribute('part', 'atcb-list-item-close');
    optionItem.role = 'button';
    optionItem.tabIndex = 0;
    listCount++;
    optionItem.dataset.optionNumber = listCount;
    optionsList.append(optionItem);
    atcb_generate_label(host, data, optionItem, 'close', !data.hideIconList);
  }
  return optionsList;
}
function atcb_generate_bg_overlay(host, trigger = '', modal = false, darken = true, closable = true) {
  const bgOverlay = (function () {
    if (modal) {
      return document.createElement('dialog');
    }
    return document.createElement('div');
  })();
  if (modal) {
    bgOverlay.setAttribute('open', true);
  }
  bgOverlay.id = 'atcb-bgoverlay';
  if (!darken) {
    bgOverlay.classList.add('atcb-no-bg');
  }
  bgOverlay.role = 'button';
  bgOverlay.tabIndex = 0;
  if (closable) {
    bgOverlay.addEventListener(
      'mouseup',
      atcb_debounce_leading((e) => {
        if (e.target !== e.currentTarget) return;
        atcb_log_event('closeList', 'Background Hit', atcbStates['active']);
        atcb_toggle(host, 'close');
      }),
    );
    let fingerMoved = false;
    bgOverlay.addEventListener(
      'touchstart',
      atcb_debounce_leading(() => (fingerMoved = false)),
      { passive: true },
    );
    bgOverlay.addEventListener(
      'touchmove',
      atcb_debounce_leading(() => (fingerMoved = true)),
      { passive: true },
    );
    bgOverlay.addEventListener(
      'touchend',
      atcb_debounce((e) => {
        if (fingerMoved !== false || e.target !== e.currentTarget) return;
        atcb_log_event('closeList', 'Background Hit', atcbStates['active']);
        atcb_toggle(host, 'close');
      }),
      { passive: true },
    );
    if (trigger !== 'click') {
      bgOverlay.addEventListener(
        'mousemove',
        atcb_debounce_leading((e) => {
          if (e.target !== e.currentTarget) return;
          atcb_log_event('closeList', 'Background Hit', atcbStates['active']);
          atcb_toggle(host, 'close');
        }),
      );
    } else {
      bgOverlay.classList.add('atcb-click');
    }
  }
  return bgOverlay;
}
/*!
 *  @preserve
 *  PER LICENSE AGREEMENT, YOU ARE NOT ALLOWED TO REMOVE OR CHANGE THIS FUNCTION!
 */
function atcb_create_atcbl(host, atList = true, returnEl = false, licenseNoteOnly = false) {
  const atcbL = document.createElement('div');
  atcbL.id = 'atcb-reference';
  if (!licenseNoteOnly) {
    setTimeout(() => {
      const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.916 2.8305"><path d="M51.446 1.2565c.0708-.2518.293-.4511.5555-.4783.2211-.042.4641.0128.622.18.2474.2472.3045.6146.2916.9503v.8594h-.8307l-.0027-1.0447c-.0079-.1547-.1075-.343-.2868-.3238-.2049.0128-.3115.2421-.295.4257v.9428h-.823l-.0027-1.0435c-.0076-.1569-.1131-.3412-.2918-.3252-.2069.008-.311.2351-.2939.4188v.9499h-.8307V.8237h.8307v.4019c.0906-.2264.2876-.4188.5368-.449.2878-.0533.6071.0705.7509.3331.0279.0465.0509.0959.0699.1468zm-3.9843.5228c-.0102.1874.107.3914.3024.424.1869.0419.3799-.0941.4215-.2776.0535-.1967-.0023-.4493-.2015-.5411-.1767-.0892-.4107.0032-.483.1865-.0297.0649-.0391.1374-.0392.2082zm-.7691 0c.0037-.2984.1395-.5957.3792-.7774.3035-.2327.7168-.2798 1.0829-.2005.3299.0729.6352.3018.7481.6275.1337.3797.0441.8526-.2795 1.1099-.3184.2561-.7624.3092-1.152.2184-.3379-.0788-.6426-.3312-.7369-.6717a1.092 1.092 0 0 1-.0417-.3063zm-.2351-.3308c-.1638-.0482-.3406-.0889-.5104-.0492s-.2742.2154-.2664.3837c-.0082.1705.0998.3468.2712.3876.1657.0389.3389.0016.4979-.0492l.0769.5499c-.2369.1272-.5165.1434-.7791.1149-.3236-.0401-.6353-.2311-.7805-.529-.1237-.2511-.139-.5539-.0485-.8181.108-.3075.3782-.5432.6902-.6287.2064-.058.4286-.0585.6371-.0119.1027.0253.198.0732.2884.1269l-.0769.523zm-2.6877.9806c-.003-.1221.066-.2371.1643-.3062.1303-.0934.3092-.1186.4572-.0533.132.054.2426.1752.2607.3197s-.0575.2836-.1746.3603c-.1633.1093-.3947.1063-.5517-.0135-.0951-.0715-.1577-.187-.1559-.307zm-3.046-1.0111c-.0091-.4276.1794-.8577.5181-1.1231.3714-.2958.8865-.3488 1.3384-.2477.4065.0946.7695.3811.9242.7731.2302.553.1173 1.2562-.3406 1.6606-.4021.3563-.9997.4264-1.5018.273-.4407-.1312-.7876-.5106-.8926-.9564a1.565 1.565 0 0 1-.0458-.3795zm1.4499.6961c.2631.014.4813-.2093.5326-.4557.0785-.3033.0224-.6834-.2491-.8753-.2182-.159-.5514-.1019-.704.1211-.1692.2437-.1902.5756-.088.8501.0775.2087.2816.3661.5085.3597zm-1.631.6458c-.1978.0602-.4078.0938-.6123.0464-.2697-.0443-.5044-.2371-.6009-.4927-.0701-.1852-.1026-.3819-.154-.5728h-.1846v1.0268h-.8614V.0601l1.3192.0034c.3398.0217.7177.1323.9118.434.152.2456.127.584-.0389.8163-.0979.1284-.2387.2162-.3846.2807.0316.1513.0475.3167.1461.4418.1193.1187.3064.1031.4596.0812v.6422zm-.871-1.8651c.0103-.138-.1243-.231-.25-.2384-.1427-.0193-.2871-.0088-.4307-.0115v.5422c.1905-.0038.3947.0138.5678-.0796a.234.234 0 0 0 .1128-.2126zM35.573.0603l1.1424.0047c.3439.0209.7218.1098.9446.3944.2252.2934.2163.7545-.0512 1.0195-.279.2859-.698.3701-1.0838.362-.0329.0105-.1126-.0258-.102.0281v.8987h-.8499V.0603zm1.0192 1.2345c.1672.0054.3805-.0562.4233-.2409.0425-.1434-.0225-.3102-.1619-.3724-.1328-.0705-.2859-.0537-.4306-.0559v.6615c.0561.0073.1128.0073.1692.0077zm-2.5176.2226h1.0576v.4653h-1.0576zM32.3311.8234h.8307v.4019q.0942-.2384.25-.348.1577-.1115.3615-.1115l.1154.6442q-.375 0-.5519.0808-.175.0788-.175.2538v1.023h-.8307zm-1.2257 1.5791c-.0937.2116-.2986.3716-.5319.3897-.3887.0533-.7844-.1743-.9578-.5217-.2044-.381-.1519-.892.1543-1.2049.2461-.2614.6627-.389.9973-.2285.1574.0799.2779.2236.3381.3886V.7662h.8268v2.0017h-.8268v-.3653zm0-.6345c-.0052-.2449-.2747-.4425-.5088-.3585-.217.0615-.3402.3271-.243.5316.0896.2161.3875.3078.5783.1678.1106-.0747.179-.2073.1735-.3408zM27.7118.7662c.2401-.008.4923.1021.6064.3222.0351.0816.045.0806.0397.0023V.1721l.8307-.1231v2.7189h-.8307v-.3653c-.0907.2158-.3003.3744-.5356.39-.3605.0507-.7279-.1432-.9123-.4525-.2569-.3983-.1992-.9693.1456-1.2985.173-.1702.412-.2772.6563-.2754zm.6461 1.0018c-.0048-.2526-.2909-.4519-.5276-.3518-.2324.0782-.3309.3933-.1843.5898.1239.1938.425.2285.5871.0636.0811-.0768.1287-.1897.1248-.3015zM24.139.8233h.7922v.4019c.1006-.2169.2949-.397.5347-.4408.2696-.0572.58.0085.76.2293.2045.2403.2438.5692.2358.8734v.8802h-.8268l-.0022-1.1213c-.004-.1252-.0677-.2748-.2066-.2939-.2045-.0306-.3739.1457-.4412.3226-.0292.0785-.0098.1646-.0154.2467v.8459h-.8306V.8233zm-1.0416 1.4236c.2011-.0002.3981-.0574.5807-.1384l.0961.5288c-.3198.1421-.6806.1894-1.027.145-.3369-.0473-.6587-.2545-.8007-.5699-.1588-.3469-.1132-.7886.1413-1.0788.2741-.3191.7406-.4335 1.1413-.3308.2768.0734.5008.3019.5751.5779.0429.146.0624.3015.043.453l-1.1806.1538c.0368.134.158.2311.2944.2482.0449.0082.0907.0114.1363.0114zm.1461-.7557c-.0268-.1234-.1257-.237-.2578-.244-.143-.0241-.2868.0725-.325.2111-.0103.0527-.0737.2029.0271.1552l.5558-.1223zm-1.4939 1.1721c-.2463.1208-.5356.1686-.805.1092-.227-.0527-.3993-.2481-.4518-.4712-.0545-.2125-.0296-.4333-.0353-.6502V.1714l.8307-.1231.0011 1.9292c.002.1378.1537.1938.2711.1813.0651.0169.1819-.1.162.0152l.0274.4893zm-2.5115-.2609c-.0937.2116-.2986.3716-.5319.3897-.3887.0533-.7844-.1743-.9578-.5217-.2044-.381-.1519-.892.1543-1.2049.2461-.2614.6627-.389.9973-.2285.1574.0799.2779.2236.3381.3886V.7661h.8268v2.0017h-.8268v-.3653zm0-.6345c-.0052-.2449-.2747-.4425-.5088-.3585-.217.0615-.3402.3271-.243.5316.0896.2161.3875.3078.5783.1678.1106-.0747.179-.2073.1735-.3408zm-2.3726.35c.1696.0054.3334-.0479.4884-.1115l.1077.6249c-.5137.3026-1.2229.2625-1.6732-.1399-.2959-.2444-.4693-.6191-.4819-1.0009-.0323-.4791.181-.9792.5853-1.2496.4565-.3128 1.0898-.3142 1.5659-.0438l-.1038.6115c-.2721-.1029-.5957-.168-.8667-.0274-.2291.1239-.3077.4039-.2984.6481-.0043.2465.1061.5161.3427.6212.1037.0495.2198.0676.3339.0676zm-2.923-.6005h1.0576v.4653h-1.0576zm-1.7829.2619c-.0102.1874.107.3914.3024.424.1869.0419.3799-.0941.4215-.2776.0535-.1967-.0023-.4493-.2015-.5411-.1767-.0892-.4107.0032-.4831.1865-.0297.0649-.0391.1374-.0392.2082zm-.7691 0c.0037-.2984.1395-.5957.3792-.7774.3035-.2327.7168-.2798 1.0829-.2005.33.0729.6352.3018.7481.6275.1337.3797.0441.8526-.2795 1.1099-.3184.2561-.7624.3092-1.152.2184-.3379-.0788-.6426-.3312-.7369-.6717a1.092 1.092 0 0 1-.0417-.3063zm-.1976.8841c-.2463.1208-.5356.1686-.805.1092-.227-.0527-.3993-.2481-.4518-.4712-.0557-.2169-.0286-.4422-.0334-.6635l.0019-.3551h-.25V.7943h.3115l.3653-.7461h.4v.7461h.4538v.4884h-.4538l.0011.6943c.0034.1365.1541.1943.2715.1818.0768.006.1848-.0959.1624.0301l.0265.4744zm-2.7861-1.146h1.0575v.4653H8.4068zM6.5412.7662c.2401-.008.4923.1021.6064.3223.0351.0816.045.0806.0397.0023V.172l.8307-.1231v2.7189h-.8307v-.3653c-.0907.2158-.3003.3744-.5356.39-.3605.0507-.7279-.1432-.9123-.4525-.2569-.3983-.1992-.9693.1456-1.2985.173-.1702.412-.2772.6563-.2754zm.6461 1.0018c-.0048-.2526-.2909-.4519-.5276-.3518-.2324.0782-.3308.3933-.1843.5898.1239.1938.425.2285.5871.0636.0811-.0768.1287-.1897.1248-.3015zM3.7956.7662c.2401-.008.4923.1021.6064.3222.0351.0816.045.0806.0397.0023V.172l.8307-.1231v2.7189h-.8307v-.3653c-.0907.2158-.3003.3744-.5356.39-.3605.0507-.7279-.1432-.9123-.4525-.2569-.3983-.1992-.9693.1456-1.2985.173-.1702.4119-.2772.6563-.2754zm.6461 1.0018c-.0048-.2526-.2909-.4519-.5276-.3518-.2324.0782-.3308.3933-.1843.5898.1239.1938.425.2285.5871.0636.0811-.0768.1287-.1897.1248-.3015zM.7498.0603h1.196l.7845 2.7074h-.9268l-.1038-.5192H.9997l-.1115.5192h-.8883zm.8576 1.7037L1.3497.5795 1.0843 1.764z"/></svg>';
      atcbL.innerHTML = '<a href="https://add-to-calendar-pro.com" target="_blank" rel="noopener">' + svg + '</a>';
    }, 500);
    if (atList) {
      host.querySelector('.atcb-initialized .atcb-list-wrapper').append(atcbL);
    } else if (returnEl) {
      return atcbL;
    } else {
      if (window.innerHeight > 1000 || window.innerWidth > 1000) {
        host.append(atcbL);
        atcbL.classList.add('fixed-ref');
      }
    }
  } else {
    atcbL.innerHTML = 'Using the <a href="https://add-to-calendar-pro.com" target="_blank" rel="noopener referrer">Add to Calendar Button</a>, licensed under the Elastic License 2.0 (ELv2).';
    atcbL.style.display = 'none !important';
    atcbL.classList.add('atcb-attribution');
    host.append(atcbL);
  }
  if (returnEl) return null;
}
async function atcb_create_modal(mainHost, data, icon = '', headline, content = '', buttons = [], subEvents = [], keyboardTrigger = false, goto = {}, closable = true) {
  atcbStates['active'] = data.identifier;
  const noHeadline = !headline || headline === '' || headline === undefined;
  const modalHost = await atcb_generate_modal_host(mainHost, data, false);
  const bgOverlay = (function () {
    const el = modalHost.getElementById('atcb-bgoverlay');
    if (!el) {
      const newOverlay = atcb_generate_bg_overlay(mainHost, 'click', true, !data.hideBackground, closable);
      modalHost.querySelector('.atcb-modal-host-initialized').append(newOverlay);
      return newOverlay;
    }
    return el;
  })();
  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('atcb-modal');
  bgOverlay.append(modalWrapper);
  const modalCount = modalHost.querySelectorAll('.atcb-modal').length;
  modalWrapper.dataset.modalNr = modalCount;
  modalWrapper.tabIndex = 0;
  modalWrapper.focus({ preventScroll: true });
  modalWrapper.blur();
  const parentButton = (function () {
    const hostEl = mainHost.getElementById(data.identifier);
    if (hostEl) {
      return hostEl;
    }
    return document.getElementById(data.identifier);
  })();
  if (parentButton) {
    parentButton.classList.add('atcb-active-modal');
  }
  const modal = document.createElement('div');
  modal.classList.add('atcb-modal-box');
  modal.setAttribute('part', 'atcb-modal-box');
  if (data.rtl) {
    modal.classList.add('atcb-rtl');
  }
  modalWrapper.append(modal);
  atcb_set_sizes(modal, data.sizes);
  atcb_set_fullsize(bgOverlay);
  if (icon !== '' && !data.hideIconModal) {
    const modalIcon = document.createElement('div');
    modalIcon.classList.add('atcb-modal-icon');
    modalIcon.innerHTML = atcbIcon[`${icon}`];
    modal.append(modalIcon);
  }
  if (!noHeadline) {
    const modalHeadline = document.createElement('div');
    modalHeadline.classList.add('atcb-modal-headline');
    modalHeadline.textContent = headline;
    modal.append(modalHeadline);
  }
  if (content !== '') {
    const modalContent = document.createElement('div');
    modalContent.classList.add('atcb-modal-content');
    if (noHeadline) modalContent.classList.add('no-headline');
    modalContent.innerHTML = content;
    modal.append(modalContent);
  }
  if (!data.hideBranding) {
    atcb_create_atcbl(modalHost, false);
  }
  if (subEvents.length > 1) {
    const modalsubEventsContentWrapper = document.createElement('div');
    modalsubEventsContentWrapper.classList.add('atcb-modal-content');
    modal.append(modalsubEventsContentWrapper);
    const modalsubEventsContent = document.createElement('div');
    modalsubEventsContent.classList.add('atcb-modal-content-subevents');
    modalsubEventsContentWrapper.append(modalsubEventsContent);
    for (let i = 1; i < subEvents.length; i++) {
      const modalSubEventButton = document.createElement('button');
      modalSubEventButton.type = 'button';
      modalSubEventButton.id = data.identifier + '-' + subEvents[0] + '-' + i;
      if (atcbStates[`${data.identifier}`][`${subEvents[0]}`][i - 1] > 0) {
        modalSubEventButton.classList.add('atcb-saved');
      }
      modalSubEventButton.classList.add('atcb-subevent-btn');
      modalsubEventsContent.append(modalSubEventButton);
      atcb_generate_date_button(data, modalSubEventButton, i, false, true);
      if (!data.dates[i - 1].overdue || data.pastDateHandling === 'none') {
        if (i === 1 && keyboardTrigger) {
          modalSubEventButton.focus();
        }
        modalSubEventButton.addEventListener(
          'click',
          atcb_debounce(() => {
            atcb_log_event('openSubEventLink', modalSubEventButton.id, data.identifier);
            modalSubEventButton.blur();
            atcb_generate_links(mainHost, subEvents[0], data, subEvents[`${i}`], keyboardTrigger, true);
          }),
        );
      } else {
        modalSubEventButton.setAttribute('disabled', true);
      }
    }
  }
  if (buttons.length === 0) {
    buttons.push({ type: 'close', label: atcb_translate_hook('close', data), small: true });
  }
  const modalButtons = document.createElement('div');
  modalButtons.classList.add('atcb-modal-buttons');
  modal.append(modalButtons);
  buttons.forEach((button, index) => {
    let modalButton;
    if (button.href && button.href !== '') {
      modalButton = document.createElement('a');
      modalButton.setAttribute('target', atcbDefaultTarget);
      modalButton.setAttribute('href', button.href);
      modalButton.setAttribute('rel', 'noopener');
    } else {
      modalButton = document.createElement('button');
      modalButton.type = 'button';
    }
    if (button.id && button.id !== '') {
      modalButton.id = button.id;
    }
    modalButton.classList.add('atcb-modal-btn');
    if (button.primary) {
      modalButton.classList.add('atcb-modal-btn-primary');
    }
    if (button.small) {
      modalButton.classList.add('btn-small');
    }
    if (!button.label || button.label === '') {
      button.label = atcb_translate_hook('modal.button.default', data);
    }
    modalButton.textContent = button.label;
    modalButtons.append(modalButton);
    if (index === 0 && subEvents.length < 2 && keyboardTrigger) {
      modalButton.focus();
    }
    switch (button.type) {
      default:
      case 'close':
        modalButton.addEventListener(
          'click',
          atcb_debounce(() => {
            atcb_log_event('closeList', 'Modal Close Button', atcbStates['active']);
            atcb_close(mainHost);
          }),
        );
        modalButton.addEventListener('keyup', function (event) {
          if (event.key === 'Enter' || event.code == 'Space' || (event.key === 'Alt' && event.key === 'Control' && event.code === 'Space')) {
            atcb_log_event('closeList', 'Modal Close Button', atcbStates['active']);
            atcb_toggle(mainHost, 'close', '', '', true);
          }
        });
        break;
      case 'yahoo2nd': // for yahoo subscribe modal, where we guide the user through the process
        modalButton.addEventListener(
          'click',
          atcb_debounce(() => {
            atcb_close(mainHost);
            atcb_subscribe_yahoo_modal_switch(mainHost, data);
          }),
        );
        modalButton.addEventListener('keyup', function (event) {
          if (event.key === 'Enter' || event.code == 'Space' || (event.key === 'Alt' && event.key === 'Control' && event.code === 'Space')) {
            atcb_toggle(mainHost, 'close', '', '', true);
            atcb_subscribe_yahoo_modal_switch(mainHost, data, keyboardTrigger);
          }
        });
        break;
      case '2timeslink': // for the note that the user shall click the button twice
        modalButton.addEventListener(
          'click',
          atcb_debounce(() => {
            atcb_close(mainHost);
            atcb_generate_links(mainHost, goto.type, data, goto.id, keyboardTrigger, false, true);
          }),
        );
        modalButton.addEventListener('keyup', function (event) {
          if (event.key === 'Enter' || event.code == 'Space' || (event.key === 'Alt' && event.key === 'Control' && event.code === 'Space')) {
            atcb_toggle(mainHost, 'close', '', '', true);
            atcb_generate_links(mainHost, goto.type, data, goto.id, keyboardTrigger, false, true);
          }
        });
        break;
      case 'none':
        break;
    }
  });
  if (modalCount > 1) {
    const prevModal = modalHost.querySelector('.atcb-modal[data-modal-nr="' + (modalCount - 1) + '"]');
    prevModal.classList.add('atcb-hidden');
  }
  atcb_manage_body_scroll(modalHost, modalWrapper);
  return;
}
function atcb_subscribe_yahoo_modal_switch(host, data, keyboardTrigger) {
  atcb_set_fully_successful(host, data);
  atcb_generate_links(host, 'yahoo2nd', data, 'all', keyboardTrigger);
}
function atcb_generate_date_button(data, parent, subEvent = 'all', oneOption = false, forceFullDate = false) {
  if (subEvent !== 'all') {
    subEvent = parseInt(subEvent) - 1;
  } else if (data.dates.length === 1) {
    subEvent = 0;
  }
  const fullTimeInfo = atcb_generate_timestring(data.dates, data.language, subEvent, false, false, forceFullDate);
  const hoverText = (function () {
    if ((subEvent !== 'all' && data.dates[`${subEvent}`].status.toLowerCase() === 'cancelled') || (subEvent === 'all' && data.allCancelled)) {
      return atcb_translate_hook('date.status.cancelled', data) + '<br>' + atcb_translate_hook('date.status.cancelled.cta', data);
    }
    if (data.pastDateHandling !== 'none') {
      if ((subEvent === 'all' && data.allOverdue) || (subEvent !== 'all' && data.dates[`${subEvent}`].overdue)) {
        return atcb_translate_hook('expired', data);
      }
    }
    if (data.label && data.label !== '') {
      return data.label;
    }
    return '+ ' + atcb_translate_hook('label.addtocalendar', data);
  })();
  const cancelledInfo = (function () {
    if ((subEvent !== 'all' && data.dates[`${subEvent}`].status.toLowerCase() === 'cancelled') || (subEvent === 'all' && data.allCancelled)) {
      return atcb_translate_hook('date.status.cancelled', data);
    }
    return '';
  })();
  const recurringString = (function () {
    if (fullTimeInfo.length === 0) {
      return atcb_translate_hook('recurring', data) + ' &#x27F3;';
    }
    return '&#x27F3;';
  })();
  let subEventAll = false;
  if (subEvent === 'all') {
    subEvent = 0;
    subEventAll = true;
  }
  const startDate = new Date(atcb_generate_time(data.dates[`${subEvent}`]).start);
  const allDay = atcb_generate_time(data.dates[`${subEvent}`]).allday;
  const timeZone = data.dates[`${subEvent}`].timeZone;
  const btnLeft = document.createElement('div');
  btnLeft.classList.add('atcb-date-btn-left');
  parent.append(btnLeft);
  const btnDay = document.createElement('div');
  btnDay.classList.add('atcb-date-btn-day');
  btnLeft.append(btnDay);
  const btnMonth = document.createElement('div');
  btnMonth.classList.add('atcb-date-btn-month');
  btnDay.textContent = startDate.toLocaleString(data.language, { day: 'numeric', timeZone: allDay ? 'UTC' : timeZone });
  btnMonth.textContent = startDate.toLocaleString(data.language, { month: 'short', timeZone: allDay ? 'UTC' : timeZone });
  btnLeft.append(btnMonth);
  const btnRight = document.createElement('div');
  btnRight.classList.add('atcb-date-btn-right');
  parent.append(btnRight);
  const btnDetails = document.createElement('div');
  btnDetails.classList.add('atcb-date-btn-details');
  btnRight.append(btnDetails);
  const btnHeadline = document.createElement('div');
  btnHeadline.classList.add('atcb-date-btn-headline');
  const btnHeadlineText = data.dates.length > 1 && subEventAll ? data.name : data.dates[`${subEvent}`].name; 
  btnHeadline.textContent = btnHeadlineText;
  btnDetails.append(btnHeadline);
  if ((data.dates[`${subEvent}`].location && data.dates[`${subEvent}`].location !== '' && !data.dates[`${subEvent}`].onlineEvent) || cancelledInfo !== '') {
    const btnLocation = document.createElement('div');
    btnLocation.classList.add('atcb-date-btn-content');
    btnDetails.append(btnLocation);
    if (cancelledInfo != '') {
      btnLocation.classList.add('atcb-date-btn-cancelled');
      btnLocation.textContent = cancelledInfo;
    } else {
      const btnLocationIcon = document.createElement('span');
      btnLocationIcon.classList.add('atcb-date-btn-content-icon');
      btnLocationIcon.innerHTML = atcbIcon['location'];
      btnLocation.append(btnLocationIcon);
      const btnLocationText = document.createElement('span');
      btnLocationText.classList.add('atcb-date-btn-content-location');
      btnLocationText.textContent = data.dates[`${subEvent}`].location;
      btnLocation.append(btnLocationText);
    }
  } else {
    if (data.dates[`${subEvent}`].description !== '' && fullTimeInfo.length === 0 && (!data.recurrence || data.recurrence === '')) {
      const btnDescription = document.createElement('div');
      btnDescription.classList.add('atcb-date-btn-content');
      btnDescription.textContent = data.dates[`${subEvent}`].descriptionHtmlFree;
      btnDescription.style.overflow = 'hidden';
      btnDescription.style.display = '-webkit-box';
      btnDescription.style.webkitLineClamp = '2';
      btnDescription.style.lineClamp = '2';
      btnDetails.append(btnDescription);
    } else {
      btnHeadline.style.lineClamp = '2';
      if (fullTimeInfo.length == 0 && (data.recurrence == null || data.recurrence == '')) {
        btnRight.style.alignSelf = 'center';
        btnHeadline.style.textAlign = 'center';
        btnHeadline.style.lineClamp = '2';
      }
    }
  }
  if (fullTimeInfo.length > 0 || (data.recurrence != null && data.recurrence != '')) {
    const btnDateTime = document.createElement('div');
    btnDateTime.classList.add('atcb-date-btn-content');
    btnDetails.append(btnDateTime);
    const btnDateTimeIcon = document.createElement('span');
    btnDateTimeIcon.classList.add('atcb-date-btn-content-icon');
    btnDateTimeIcon.innerHTML = atcbIcon['ical'];
    btnDateTime.append(btnDateTimeIcon);
    const btnDateTimeText = document.createElement('span');
    btnDateTimeText.classList.add('atcb-date-btn-content-text');
    btnDateTime.append(btnDateTimeText);
    fullTimeInfo.forEach(function (block) {
      const btnDateTimeTextBlock = document.createElement('span');
      btnDateTimeTextBlock.textContent = block;
      btnDateTimeText.append(btnDateTimeTextBlock);
    });
    if (data.recurrence != null && data.recurrence != '') {
      const recurSign = document.createElement('span');
      recurSign.innerHTML = recurringString;
      btnDateTimeText.append(recurSign);
    }
  }
  const btnHover = document.createElement('div');
  btnHover.classList.add('atcb-date-btn-hover');
  btnHover.innerHTML = hoverText;
  btnRight.append(btnHover);
  if (!data.hideCheckmark && data.dates[`${subEvent}`].status.toLowerCase() !== 'cancelled') {
    const btnCheck = document.createElement('div');
    btnCheck.classList.add('atcb-checkmark');
    btnCheck.innerHTML = atcbIcon['checkmark'];
    parent.append(btnCheck);
  }
  const ariaLabel =
    hoverText.replace(/<br>/g, ' ').replace(/\+\s/g, '') +
    (oneOption ? ' (' + atcb_translate_hook(data.options[0], data) + ')' : '') +
    ': ' +
    btnHeadlineText +
    (data.dates[`${subEvent}`].location && data.dates[`${subEvent}`].location !== '' ? ', ' + data.dates[`${subEvent}`].location : '') +
    ', ' +
    fullTimeInfo.join(' ');
  parent.setAttribute('aria-label', ariaLabel);
}
async function atcb_generate_modal_host(host, data, reset = true) {
  const existingModalHost = document.getElementById(data.identifier + '-modal-host');
  if (existingModalHost) {
    if (!reset) {
      return existingModalHost.shadowRoot;
    }
    existingModalHost.remove();
  }
  let newModalHost = document.createElement('div');
  newModalHost.id = data.identifier + '-modal-host';
  if (host.host.hasAttribute('cspnonce')) {
    newModalHost.setAttribute('cspnonce', host.host.getAttribute('cspnonce'));
  }
  newModalHost.setAttribute('atcb-button-id', data.identifier);
  newModalHost.classList.add('add-to-calendar');
  newModalHost.style.transform = 'translate3D(0, 0, 0)';
  newModalHost.style.visibility = 'visible';
  newModalHost.style.opacity = '1';
  newModalHost.style.position = 'fixed';
  newModalHost.style.top = '0';
  newModalHost.style.left = '0';
  newModalHost.style.width = '100%';
  newModalHost.style.height = '100%';
  newModalHost.style.display = 'flex';
  newModalHost.style.zIndex = '13999998';
  document.body.append(newModalHost);
  newModalHost.attachShadow({ mode: 'open', delegateFocus: true });
  const elem = document.createElement('template');
  elem.innerHTML = '<div class="atcb-modal-host-initialized"></div>';
  newModalHost.shadowRoot.append(elem.content.cloneNode(true));
  atcb_set_light_mode(newModalHost.shadowRoot, data);
  await atcb_load_css(newModalHost.shadowRoot, null, data);
  return newModalHost.shadowRoot;
}
async function atcb_generate_overlay_dom(host, data) {
  const newHost = await atcb_generate_modal_host(host, data);
  atcb_set_fullsize(newHost.querySelector('.atcb-modal-host-initialized'));
  const nodes = Array.from(host.children);
  nodes.forEach((node) => {
    if (node.tagName != 'STYLE') {
      newHost.querySelector('.atcb-modal-host-initialized').append(node.cloneNode(true));
    }
  });
  newHost.querySelector('button.atcb-button').removeAttribute('id');
  host.host.classList.add('atcb-shadow-hide');
  host.querySelector('.atcb-initialized').style.opacity = '0';
  atcb_position_shadow_button(host, newHost);
  window.addEventListener('scroll', atcb_position_shadow_button_listener);
  window.addEventListener('resize', atcb_position_shadow_button_listener);
  return newHost.querySelector('.atcb-modal-host-initialized');
}


function atcb_generate_rich_data(data, parent) {
  const schemaEl = document.createElement('script');
  schemaEl.id = 'atcb-schema-' + data.identifier;
  if (parent.hasAttribute('cspnonce')) {
    const cspnonceRegex = /[`'"()[\]{}<>\s]/;
    if (cspnonceRegex.test(parent.getAttribute('cspnonce'))) {
      throw new Error('cspnonce input contains forbidden characters.');
    }
    schemaEl.setAttribute('nonce', parent.getAttribute('cspnonce'));
  }
  schemaEl.type = 'application/ld+json';
  const id = data.name.replace(/\s/g, '');
  const schemaContentMulti = [];
  if (data.dates.length > 1) {
    const parts = [];
    parts.push('"@context":"https://schema.org"');
    parts.push('"@type":"EventSeries"');
    parts.push('"@id":"' + id + '"');
    parts.push('"name":"' + data.name + '",');
    schemaContentMulti.push('{\r\n' + parts.join(',\r\n') + '\r\n');
  }
  const schemaContentFull = [];
  for (let i = 0; i < data.dates.length; i++) {
    const schemaContent = [];
    schemaContent.push('"@context":"https://schema.org"');
    schemaContent.push('"@type":"Event"');
    if (data.dates.length > 1) {
      schemaContent.push('"@id":"' + id + '-' + (i + 1) + '"');
    }
    if (data.dates[`${i}`].status.toLowerCase() === 'cancelled') {
      schemaContent.push('"eventStatus":"https://schema.org/EventCancelled"');
    } else {
      schemaContent.push('"eventStatus":"https://schema.org/EventScheduled"');
    }
    schemaContent.push('"name":"' + data.dates[`${i}`].name + '"');
    if (data.dates[`${i}`].descriptionHtmlFree) {
      schemaContent.push('"description":"' + data.dates[`${i}`].descriptionHtmlFree + '"');
    }
    const formattedDate = atcb_generate_time(data.dates[`${i}`], 'delimiters', 'general', true);
    schemaContent.push('"startDate":"' + formattedDate.start + '"');
    if (formattedDate.duration) {
      schemaContent.push('"duration":"' + formattedDate.duration + '"');
    }
    schemaContent.push(data.dates[`${i}`].onlineEvent ? '"eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode",\r\n"location": {\r\n"@type":"VirtualLocation",\r\n"url":"' + data.dates[`${i}`].location + '"\r\n}' : '"location":"' + data.dates[`${i}`].location + '"');
    if (data.recurrence && data.recurrence !== '') {
      schemaContent.push(...atcb_generate_rich_data_recurrence(data, formattedDate));
    } else {
      schemaContent.push('"endDate":"' + formattedDate.end + '"');
    }
    if (data.dates[`${i}`].organizer && data.dates[`${i}`].organizer !== '') {
      const organizerParts = data.dates[`${i}`].organizer.split('|');
      schemaContent.push('"organizer":{\r\n"@type":"Person",\r\n"name":"' + organizerParts[0] + '",\r\n"email":"' + organizerParts[1] + '"\r\n}');
    }
    const imageData = [];
    if (data.images) {
      if (Array.isArray(data.images)) {
        for (let i = 0; i < data.images.length; i++) {
          if (atcb_secure_url(data.images[`${i}`], data.debug) && data.images[`${i}`].startsWith('http')) {
            imageData.push('"' + data.images[`${i}`] + '"');
          }
        }
      }
    }
    if (imageData.length > 0) {
      schemaContent.push('"image":[\r\n' + imageData.join(',\r\n') + ']');
    }
    schemaContentFull.push('{\r\n' + schemaContent.join(',\r\n') + '\r\n}');
  }
  if (data.dates.length > 1) {
    schemaEl.textContent = schemaContentMulti.join(',\r\n') + '"subEvents":[\r\n' + schemaContentFull.join(',\r\n') + '\r\n]\r\n}';
  } else {
    schemaEl.textContent = schemaContentFull[0];
  }
  document.body.insertBefore(schemaEl, document.body.firstChild);
}
function atcb_generate_rich_data_recurrence(data, formattedDate) {
  const schemaRecurrenceContent = [];
  schemaRecurrenceContent.push('"eventSchedule": { "@type": "Schedule"');
  schemaRecurrenceContent.push('"scheduleTimezone":"' + data.dates[0].timeZone + '"');
  if (data.recurrence_interval && data.recurrence_interval !== '' && data.recurrence_frequency && data.recurrence_frequency !== '') {
    const repeatFrequency = 'P' + data.recurrence_interval + data.recurrence_frequency.substring(0, 1);
    schemaRecurrenceContent.push('"repeatFrequency":"' + repeatFrequency + '"');
  }
  if (data.recurrence_byDay && data.recurrence_byDay !== '') {
    const byDayString = (function () {
      if (/\d/.test(data.recurrence_byDay)) {
        return '"' + data.recurrence_byDay + '"';
      } else {
        const byDays = data.recurrence_byDay.split(',');
        const helperMap = {
          MO: 'https://schema.org/Monday',
          TU: 'https://schema.org/Tuesday',
          WE: 'https://schema.org/Wednesday',
          TH: 'https://schema.org/Thursday',
          FR: 'https://schema.org/Friday',
          SA: 'https://schema.org/Saturday',
          SU: 'https://schema.org/Sunday',
        };
        const output = [];
        for (let i = 0; i < byDays.length; i++) {
          output.push('"' + helperMap[byDays[`${i}`]] + '"');
        }
        return '[' + output.join(',') + ']';
      }
    })();
    schemaRecurrenceContent.push('"byDay":' + byDayString);
  }
  if (data.recurrence_byMonth && data.recurrence_byMonth !== '') {
    const byMonthString = data.recurrence_byMonth.includes(',') ? '[' + data.recurrence_byMonth + ']' : data.recurrence_byMonth;
    schemaRecurrenceContent.push('"byMonth":"' + byMonthString + '"');
  }
  if (data.recurrence_byMonthDay && data.recurrence_byMonthDay !== '') {
    const byMonthDayString = data.recurrence_byMonthDay.includes(',') ? '[' + data.recurrence_byMonthDay + ']' : data.recurrence_byMonthDay;
    schemaRecurrenceContent.push('"byMonthDay":"' + byMonthDayString + '"');
  }
  if (data.recurrence_count && data.recurrence_count !== '') {
    schemaRecurrenceContent.push('"repeatCount":"' + data.recurrence_count + '"');
  }
  if (data.recurrence_until && data.recurrence_until !== '') {
    schemaRecurrenceContent.push('"endDate":"' + data.recurrence_until + '"');
  }
  if (data.startTime && data.startTime !== '' && data.endTime && data.endTime !== '') {
    schemaRecurrenceContent.push('"startTime":"' + data.startTime + ':00"');
    schemaRecurrenceContent.push('"endTime":"' + data.endTime + ':00"');
    schemaRecurrenceContent.push('"duration":"' + formattedDate.duration + '"');
  }
  schemaRecurrenceContent.push('"startDate":"' + data.startDate + '" }');
  return schemaRecurrenceContent;
}


function atcb_generate_links(host, type, data, subEvent = 'all', keyboardTrigger = false, multiDateModal = false, skipDoubleLink = false) {
  let linkType = type;
  if (type === 'apple') {
    linkType = 'ical';
  }
  if (subEvent !== 'all') {
    subEvent = parseInt(subEvent) - 1;
  } else if (data.dates.length == 1) {
    subEvent = 0;
  }
  if (data.subscribe) {
    atcb_generate_subscribe_links(host, type, linkType, data, keyboardTrigger);
    return;
  }
  if (subEvent !== 'all') {
    if (data.dates[`${subEvent}`].status.toLowerCase() === 'cancelled' && linkType !== 'ical') {
      atcb_create_modal(host, data, 'warning', atcb_translate_hook('date.status.cancelled', data), atcb_translate_hook('date.status.cancelled.cta', data), [], [], keyboardTrigger);
    } else {
      if (!skipDoubleLink) {
      }
      switch (linkType) {
        case 'ical': // also for apple (see above)
          atcb_generate_ical(host, data, type, subEvent, keyboardTrigger);
          break;
        case 'google':
          atcb_generate_google(data, data.dates[`${subEvent}`], subEvent);
          break;
        case 'msteams':
          atcb_generate_msteams(data, data.dates[`${subEvent}`], subEvent);
          break;
        case 'ms365':
          atcb_generate_microsoft(data, data.dates[`${subEvent}`], subEvent);
          break;
        case 'outlookcom':
          atcb_generate_microsoft(data, data.dates[`${subEvent}`], subEvent, 'outlookcom');
          break;
        case 'yahoo':
          atcb_generate_yahoo(data, data.dates[`${subEvent}`], subEvent);
          break;
      }
      const modalHost = document.getElementById(data.identifier + '-modal-host');
      if (modalHost) {
        const subEventButton = modalHost.shadowRoot.getElementById(data.identifier + '-' + type + '-' + (subEvent + 1));
        if (subEventButton) {
          subEventButton.classList.add('atcb-saved');
        }
      }
      if (data.dates[`${subEvent}`].status.toLowerCase() !== 'cancelled') atcbStates[`${data.identifier}`][`${type}`][`${subEvent}`]++;
      const filteredStates = atcbStates[`${data.identifier}`][`${type}`].filter(function (value) {
        return value < 1;
      });
      if (filteredStates.length == 0) {
        atcb_set_fully_successful(host, data, multiDateModal);
      }
    }
    return;
  }
  atcb_generate_multidate_links(host, type, linkType, data, keyboardTrigger, multiDateModal);
}
function atcb_generate_multidate_links(host, type, linkType, data, keyboardTrigger, multiDateModal) {
  if (linkType === 'ical' && !data.dates.some((theSubEvent) => theSubEvent.status.toLowerCase() === 'cancelled') && data.dates.every((theSubEvent) => (theSubEvent.organizer || '') === (data.dates[0].organizer || ''))) {
    atcb_generate_ical(host, data, type, 'all', keyboardTrigger);
    for (let i = 0; i < atcbStates[`${data.identifier}`][`${type}`].length; i++) {
      atcbStates[`${data.identifier}`][`${type}`][`${i}`]++;
    }
    atcb_set_fully_successful(host, data, multiDateModal);
    return;
  }
  if (!multiDateModal) {
    const individualButtons = [type];
    for (let i = 0; i < data.dates.length; i++) {
      individualButtons.push(i + 1);
    }
    atcb_create_modal(host, data, type, atcb_translate_hook('modal.multidate.h', data), atcb_translate_hook('modal.multidate.text', data), [], individualButtons, keyboardTrigger);
  }
}
function atcb_generate_subscribe_links(host, type, linkType, data, keyboardTrigger) {
  const adjustedFileUrl = data.icsFile.replace('https://', 'webcal://');
  switch (linkType) {
    case 'ical': // also for apple (see above)
      if (atcbIsAndroid() || data.fakeAndroid) {
        atcb_subscribe_ical(data, data.icsFile, type);
        break;
      }
      atcb_subscribe_ical(data, adjustedFileUrl, type, host, keyboardTrigger);
      break;
    case 'google':
      atcb_subscribe_google(data, adjustedFileUrl);
      break;
    case 'ms365':
      atcb_subscribe_microsoft(data, adjustedFileUrl, data.name);
      break;
    case 'outlookcom':
      atcb_subscribe_microsoft(data, adjustedFileUrl, data.name, 'outlookcom');
      break;
    case 'yahoo':
      if (data.proxy) {
        atcb_open_cal_url(data, 'yahoo', '', true);
        return;
      }
      atcb_copy_to_clipboard(data.icsFile);
      atcb_create_modal(
        host,
        data,
        'yahoo',
        atcb_translate_hook('modal.subscribe.yahoo.h', data),
        atcb_translate_hook('modal.clipboard.text', data) + '<br>' + atcb_translate_hook('modal.subscribe.yahoo.text', data),
        [
          {
            label: atcb_translate_hook('modal.subscribe.yahoo.button', data),
            primary: true,
            type: 'yahoo2nd',
            href: 'https://www.yahoo.com/calendar',
          },
          { label: atcb_translate_hook('cancel', data) },
        ],
        [],
        keyboardTrigger,
      );
      return;
    case 'yahoo2nd':
      atcb_copy_to_clipboard(data.icsFile);
      atcb_create_modal(
        host,
        data,
        'yahoo',
        atcb_translate_hook('modal.subscribe.yahoo.h', data),
        atcb_translate_hook('modal.clipboard.text', data) + '<br>' + atcb_translate_hook('modal.subscribe.yahoo.text', data),
        [
          {
            label: atcb_translate_hook('modal.subscribe.yahoo.button', data),
            type: 'none',
            href: 'https://www.yahoo.com/calendar',
          },
          { label: atcb_translate_hook('cancel', data) },
        ],
        [],
        keyboardTrigger,
      );
      return;
  }
  atcb_set_fully_successful(host, data);
}
function atcb_set_fully_successful(host, data, multiDateModal = false) {
  const trigger = host.getElementById(data.identifier);
  if (trigger) {
    trigger.classList.add('atcb-saved');
  }
  atcb_saved_hook(host, data);
  if (multiDateModal && host.querySelectorAll('.atcb-modal[data-modal-nr]').length < 2) {
    atcb_toggle(host, 'close');
  }
}
function atcb_subscribe_ical(data, fileUrl, type, host = null, keyboardTrigger = false) {
  if (atcbIsiOS() && !atcbIsSafari()) {
    atcb_ical_copy_note(host, fileUrl, data, keyboardTrigger);
    return;
  }
  atcb_open_cal_url(data, type, fileUrl, true);
}
function atcb_subscribe_google(data, fileUrl) {
  const baseUrl = 'https://calendar.google.com/calendar/u/0/r?cid=';
  const baseUrlApp = 'calendar.google.com/calendar?cid=';
  let isGoogleCalId = false;
  const newFileUrl = (function () {
    if (/^(?:webcal:\/\/|\/\/)calendar\.google\.com\/.*\?cid=/.test(fileUrl)) {
      isGoogleCalId = true;
      return fileUrl.replace(/^(.)*\?cid=/, '');
    }
    return encodeURIComponent(fileUrl);
  })();
  if ((atcbIsAndroid() || data.fakeAndroid) && isGoogleCalId) {
    atcb_open_cal_url(data, 'google', 'intent://' + baseUrlApp + newFileUrl + '#Intent;scheme=https;package=com.google.android.calendar;end', true);
    return;
  }
  atcb_open_cal_url(data, 'google', baseUrl + newFileUrl, true);
}
function atcb_subscribe_microsoft(data, fileUrl, calName, type = 'ms365') {
  const urlParts = [];
  const baseUrl = (function () {
    if (type == 'outlookcom') {
      return 'https://outlook.live.com/calendar/0/addfromweb/?';
    } else {
      return 'https://outlook.office.com/calendar/0/addfromweb/?';
    }
  })();
  urlParts.push('url=' + encodeURIComponent(fileUrl));
  urlParts.push('name=' + encodeURIComponent(calName));
  atcb_open_cal_url(data, type, baseUrl + urlParts.join('&'), true);
}
function atcb_generate_google(data, date, subEvent = 'all') {
  const urlParts = [];
  if (atcbIsMobile() || data.fakeMobile) {
    urlParts.push('https://calendar.google.com/calendar/render?action=TEMPLATE&');
  } else {
    urlParts.push('https://calendar.google.com/calendar/r/eventedit?');
  }
  const formattedDate = atcb_generate_time(date, 'clean', 'google');
  urlParts.push('dates=' + encodeURIComponent(formattedDate.start) + '%2F' + encodeURIComponent(formattedDate.end));
  if (date.timeZone && date.timeZone !== '' && !/GMT[+|-]\d{1,2}|Etc\/U|Etc\/Zulu|CET|CST6CDT|EET|EST|MET|MST|PST8PDT|WET/i.test(date.timeZone) && !formattedDate.allday) {
    urlParts.push('ctz=' + date.timeZone);
  }
  if (date.name && date.name !== '') {
    urlParts.push('text=' + encodeURIComponent(date.name));
  }
  const tmpDataDescription = [];
  if (date.description && date.description !== '') {
    tmpDataDescription.push(date.description);
  }
  if (date.location && date.location !== '') {
    urlParts.push('location=' + encodeURIComponent(date.location));
    if (atcbIsiOS() || data.fakeIOS) {
      if (tmpDataDescription.length > 0) {
        tmpDataDescription.push('<br><br>');
      }
      tmpDataDescription.push('&#128205;: ' + date.location);
    }
  }
  if (tmpDataDescription.length > 0) {
    urlParts.push('details=' + encodeURIComponent(tmpDataDescription.join('')));
  }
  if (date.recurrence && date.recurrence !== '') {
    urlParts.push('recur=' + encodeURIComponent(date.recurrence));
  }
  if (date.availability && date.availability !== '') {
    const availabilityPart = (function () {
      if (date.availability == 'free') {
        return 'crm=AVAILABLE&trp=false';
      }
      return 'crm=BUSY&trp=true';
    })();
    urlParts.push(availabilityPart);
  }
  let fullUrl = urlParts.join('&');
  if (atcbIsAndroid() || data.fakeAndroid) {
    fullUrl = 'intent://' + fullUrl.slice(8) + '#Intent;scheme=https;package=com.google.android.calendar;end';
  }
  atcb_open_cal_url(data, 'google', fullUrl, false, subEvent);
}
function atcb_generate_yahoo(data, date, subEvent = 'all') {
  const urlParts = [];
  urlParts.push('https://calendar.yahoo.com/?v=60');
  const formattedDate = atcb_generate_time(date, 'clean');
  if (formattedDate.allday) {
    if (formattedDate.start === formattedDate.end) {
      urlParts.push('dur=allday&st=' + encodeURIComponent(formattedDate.start)); 
    } else {
      const allDayDate = JSON.parse(JSON.stringify(date));
      allDayDate.startTime = '00:00';
      allDayDate.endTime = '23:59';
      allDayDate.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedAllDayDate = atcb_generate_time(allDayDate, 'clean');
      urlParts.push('st=' + encodeURIComponent(formattedAllDayDate.start) + '&et=' + encodeURIComponent(formattedAllDayDate.end));
    }
  } else {
    urlParts.push('st=' + encodeURIComponent(formattedDate.start) + '&et=' + encodeURIComponent(formattedDate.end));
  }
  if (date.name && date.name !== '') {
    urlParts.push('title=' + encodeURIComponent(date.name));
  }
  if (date.location && date.location !== '') {
    urlParts.push('in_loc=' + encodeURIComponent(date.location));
  }
  if (date.descriptionHtmlFree && date.descriptionHtmlFree !== '') {
    urlParts.push('desc=' + encodeURIComponent(date.descriptionHtmlFree));
  }
  atcb_open_cal_url(data, 'yahoo', urlParts.join('&'), false, subEvent);
}
function atcb_generate_microsoft(data, date, subEvent = 'all', type = 'ms365') {
  const urlParts = [];
  const basePath = (function () {
    if (atcbIsMobile() || data.fakeMobile) {
      return '/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent';
    }
    return '/calendar/0/action/compose?rru=addevent';
  })();
  const baseUrl = (function () {
    if (type == 'outlookcom') {
      return 'https://outlook.live.com' + basePath;
    } else {
      return 'https://outlook.office.com' + basePath;
    }
  })();
  urlParts.push(baseUrl);
  const formattedDate = atcb_generate_time(date, 'delimiters', 'microsoft');
  urlParts.push('startdt=' + formattedDate.start);
  urlParts.push('enddt=' + formattedDate.end);
  if (formattedDate.allday) {
    urlParts.push('allday=true');
  }
  if (date.name && date.name !== '') {
    urlParts.push('subject=' + encodeURIComponent(date.name));
  }
  if (date.location && date.location !== '') {
    urlParts.push('location=' + encodeURIComponent(date.location));
  }
  if (date.description && date.description !== '') {
    urlParts.push('body=' + encodeURIComponent(date.description));
  }
  atcb_open_cal_url(data, type, urlParts.join('&'), false, subEvent);
}
function atcb_generate_msteams(data, date, subEvent = 'all') {
  const urlParts = [];
  const baseUrl = 'https://teams.microsoft.com/l/meeting/new?';
  const formattedDate = atcb_generate_time(date, 'delimiters', 'msteams', true);
  if (!formattedDate.allday || atcbIsMobile() || data.fakeMobile) {
    urlParts.push('startTime=' + encodeURIComponent(formattedDate.start));
    urlParts.push('endTime=' + encodeURIComponent(formattedDate.end));
  } else {
    urlParts.push('startTime=' + formattedDate.start);
    urlParts.push('endTime=' + formattedDate.end);
  }
  if (date.name && date.name !== '') {
    urlParts.push('subject=' + encodeURIComponent(date.name));
  }
  let locationString = '';
  if (date.location && date.location !== '') {
    locationString = date.location;
    locationString += ' // '; 
    urlParts.push('location=' + encodeURIComponent(locationString));
  }
  if (date.descriptionHtmlFree && date.descriptionHtmlFree != '') {
    urlParts.push('content=' + locationString + encodeURIComponent(date.descriptionHtmlFree));
  }
  atcb_open_cal_url(data, 'msteams', baseUrl + urlParts.join('&'), false, subEvent);
}
function atcb_open_cal_url(data, type, url = '', subscribe = false, subEvent = null, target = '') {
  if (target === '') {
    target = atcbDefaultTarget;
  }
  if (data.proxy && data.proKey && data.proKey !== '') {
    const urlType = subscribe ? 's' : 'o';
    const query = (function () {
      const parts = [];
      if (data.attendee && data.attendee !== '') {
        parts.push('attendee=' + encodeURIComponent(data.attendee));
      }
      if (data.customVar && typeof data.customVar === 'object' && Object.keys(data.customVar).length > 0) {
        parts.push('customvar=' + encodeURIComponent(JSON.stringify(data.customVar)));
      }
      if (data.dates && data.dates.length > 1 && subEvent !== null && subEvent !== 'all') {
        parts.push('sub-event=' + subEvent);
      }
      if (parts.length > 0) {
        return '?' + parts.join('&');
      }
      return '';
    })();
    const host = data.domain ? data.domain : data.dev ? 'dev.caldn.net' : 'caldn.net';
    url = `https://${host}/${data.proKey}/${urlType}/${type}${query}`;
    if (!atcb_secure_url(url)) {
      return;
    }
  }
  if (atcb_secure_url(url)) {
    const newTab = window.open(url, target);
    if (newTab) {
      newTab.focus();
    }
  }
}
function atcb_generate_ical(host, data, type, subEvent = 'all', keyboardTrigger = false) {
  if (subEvent !== 'all') {
    subEvent = parseInt(subEvent);
  }
  const filename = atcb_determine_ical_filename(data, subEvent);
  const givenIcsFile = (function () {
    const potentialHostAttendee = host.host.getAttribute('attendee') || '';
    const potentialHostCustomVar = host.host.getAttribute('customVar') || '';
    if ((data.attendee && data.attendee !== '' && potentialHostAttendee !== '') || (data.customVar && data.customVar !== '' && potentialHostCustomVar !== '')) {
      return '';
    }
    if (subEvent !== 'all' && data.dates[`${subEvent}`].icsFile && data.dates[`${subEvent}`].icsFile !== '') {
      return data.dates[`${subEvent}`].icsFile;
    }
    if (data.icsFile && data.icsFile !== '') {
      return data.icsFile;
    }
    return '';
  })();
  if (data.proxy) {
    atcb_open_cal_url(data, type, '', false, subEvent);
    return;
  }
  if (givenIcsFile !== '' && ((!atcbIsiOS() && !data.fakeIOS) || !atcbIsWebView() || data.bypassWebViewCheck)) {
    atcb_save_file(givenIcsFile, filename);
    return;
  }
  const now = new Date();
  const ics_lines = ['BEGIN:VCALENDAR', 'VERSION:2.0'];
  ics_lines.push('PRODID:-// https://add-to-calendar-pro.com // button v' + atcbVersion + ' //EN');
  ics_lines.push('CALSCALE:GREGORIAN');
  if (subEvent === 'all') {
    if (data.dates[0].organizer && data.dates[0].organizer !== '') {
      ics_lines.push('METHOD:REQUEST');
    } else {
      ics_lines.push('METHOD:PUBLISH');
    }
  } else {
    if (data.dates[`${subEvent}`].status && data.dates[`${subEvent}`].status.toLowerCase() === 'cancelled') {
      ics_lines.push('METHOD:CANCEL');
    } else {
      if (data.dates[`${subEvent}`].organizer && data.dates[`${subEvent}`].organizer !== '') {
        ics_lines.push('METHOD:REQUEST');
      } else {
        ics_lines.push('METHOD:PUBLISH');
      }
    }
  }
  const usedTimeZones = [];
  const loopStart = (function () {
    if (subEvent != 'all') {
      return subEvent;
    }
    return 0;
  })();
  const loopEnd = (function () {
    if (subEvent != 'all') {
      return subEvent;
    }
    return data.dates.length - 1;
  })();
  for (let i = loopStart; i <= loopEnd; i++) {
    const formattedDate = atcb_generate_time(data.dates[`${i}`], 'clean', 'ical');
    const timeAddon = (function () {
      if (formattedDate.allday) {
        return ';VALUE=DATE';
      }
      if (data.dates[`${i}`].timeZone && data.dates[`${i}`].timeZone !== '') {
        const timeZoneBlock = tzlib_get_ical_block(data.dates[`${i}`].timeZone);
        if (!usedTimeZones.includes(data.dates[`${i}`].timeZone)) {
          ics_lines.push(timeZoneBlock[0]);
        }
        usedTimeZones.push(data.dates[`${i}`].timeZone);
        return ';' + timeZoneBlock[1];
      }
    })();
    ics_lines.push('BEGIN:VEVENT');
    if (data.dates[`${i}`].uid && data.dates[`${i}`].uid !== '') {
      ics_lines.push('UID:' + data.dates[`${i}`].uid);
    }
    ics_lines.push('DTSTAMP:' + atcb_format_datetime(now, 'clean', true));
    ics_lines.push('DTSTART' + timeAddon + ':' + formattedDate.start);
    ics_lines.push('DTEND' + timeAddon + ':' + formattedDate.end);
    ics_lines.push('SUMMARY:' + atcb_rewrite_ical_text(data.dates[`${i}`].name));
    if (data.dates[`${i}`].descriptionHtmlFreeICal && data.dates[`${i}`].descriptionHtmlFreeICal !== '') {
      ics_lines.push('DESCRIPTION:' + atcb_rewrite_ical_text(data.dates[`${i}`].descriptionHtmlFreeICal));
    }
    if (data.dates[`${i}`].description && data.dates[`${i}`].description !== '') {
      ics_lines.push('X-ALT-DESC;FMTTYPE=text/html:\r\n <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">\r\n <HTML><BODY>\r\n ' + atcb_rewrite_ical_text(data.dates[`${i}`].description) + '\r\n </BODY></HTML>');
    }
    if (data.dates[`${i}`].location && data.dates[`${i}`].location !== '') {
      ics_lines.push('LOCATION:' + atcb_rewrite_ical_text(data.dates[`${i}`].location));
    }
    if (data.dates[`${i}`].organizer && data.dates[`${i}`].organizer !== '') {
      const organizerParts = data.dates[`${i}`].organizer.split('|');
      ics_lines.push('ORGANIZER;CN=' + atcb_rewrite_ical_text(organizerParts[0], true) + ':MAILTO:' + organizerParts[1]);
    }
    if (data.dates[`${i}`].attendee && data.dates[`${i}`].attendee !== '') {
      const attendeeParts = data.dates[`${i}`].attendee.split('|');
      if (attendeeParts.length === 2) {
        ics_lines.push('ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=' + atcb_rewrite_ical_text(attendeeParts[0], true) + ';X-NUM-GUESTS=0:mailto:' + attendeeParts[1]);
      } else {
        ics_lines.push('ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=' + attendeeParts[0] + ';X-NUM-GUESTS=0:mailto:' + attendeeParts[0]);
      }
    }
    if (data.recurrence && data.recurrence !== '') {
      ics_lines.push(data.recurrence);
    }
    if (data.dates[`${i}`].availability && data.dates[`${i}`].availability !== '') {
      const transpVal = (function () {
        if (data.dates[`${i}`].availability == 'free') {
          return 'TRANSPARENT';
        }
        return 'OPAQUE';
      })();
      ics_lines.push('TRANSP:' + transpVal);
    }
    ics_lines.push('SEQUENCE:' + data.dates[`${i}`].sequence);
    ics_lines.push('STATUS:' + data.dates[`${i}`].status);
    ics_lines.push('CREATED:' + data.created);
    ics_lines.push('LAST-MODIFIED:' + data.updated);
    ics_lines.push('END:VEVENT');
  }
  ics_lines.push('END:VCALENDAR');
  const dataUrl = (function () {
    if (givenIcsFile != '') {
      return givenIcsFile;
    }
    const icsContent = atcb_format_ical_lines(ics_lines.join('\r\n'));
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
  })();
  if ((atcbIsiOS() && !atcbIsSafari()) || (atcbIsWebView() && (atcbIsiOS() || (atcbIsAndroid() && atcbIsProblematicWebView())))) {
    atcb_ical_copy_note(host, dataUrl, data, keyboardTrigger);
    return;
  }
  atcb_save_file(dataUrl, filename);
}
function atcb_determine_ical_filename(data, subEvent) {
  const filenameSuffix = (function () {
    if (subEvent != 'all' && subEvent != 0) {
      return '-' + parseInt(subEvent) + 1;
    }
    return '';
  })();
  if (data.iCalFileName != null && data.iCalFileName != '') {
    return data.iCalFileName + filenameSuffix;
  }
  if (data.icsFile != null && data.icsFile != '') {
    const filenamePart = data.icsFile.split('/').pop().split('.')[0];
    if (filenamePart != '') {
      return filenamePart + filenameSuffix;
    }
  }
  return 'event-to-save-in-my-calendar' + filenameSuffix;
}
function atcb_ical_copy_note(host, dataUrl, data, keyboardTrigger) {
  atcb_copy_to_clipboard(dataUrl);
  if (atcbIsiOS() && !atcbIsSafari()) {
    atcb_create_modal(
      host,
      data,
      'warning',
      atcb_translate_hook('modal.opensafari.ical.h', data),
      atcb_translate_hook('modal.opensafari.ical.text', data) + '<br>' + atcb_translate_hook('modal.clipboard.text', data) + '<br>' + atcb_translate_hook('modal.opensafari.ical.steps', data),
      [],
      [],
      keyboardTrigger,
    );
    return;
  }
  atcb_create_modal(host, data, 'warning', atcb_translate_hook('modal.webview.ical.h', data), atcb_translate_hook('modal.webview.ical.text', data) + '<br>' + atcb_translate_hook('modal.clipboard.text', data) + '<br>' + atcb_translate_hook('modal.webview.ical.steps', data), [], [], keyboardTrigger);
}


function atcb_saved_hook(host, data) {
  atcb_log_event('success', data.identifier, data.identifier);
  if (data.ty && typeof atcb_generate_ty === 'function') {
    setTimeout(() => {
      atcb_generate_ty(host, data);
    }, 1000);
  }
}
function atcb_save_file(file, filename) {
  try {
    const save = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save.rel = 'noopener';
    save.href = file;
    if (atcbIsMobile()) {
      save.target = '_self';
    } else {
      save.target = '_blank';
    }
    save.download = filename + '.ics';
    const evt = new MouseEvent('click', {
      view: window,
      button: 0,
      bubbles: true,
      cancelable: false,
    });
    save.dispatchEvent(evt);
    (window.URL || window.webkitURL).revokeObjectURL(save.href);
  } catch (e) {
    console.error(e);
  }
}
function atcb_generate_time(data, style = 'delimiters', targetCal = 'general', addTimeZoneOffset = false) {
  if (data.startTime && data.startTime !== '' && data.endTime && data.endTime !== '') {
    const newStartDate = new Date(data.startDate + 'T' + data.startTime + ':00.000+00:00');
    if (!data.endDate) data.endDate = data.startDate;
    const newEndDate = new Date(data.endDate + 'T' + data.endTime + ':00.000+00:00');
    const durationMS = newEndDate - newStartDate;
    const durationHours = Math.floor(durationMS / 1000 / 60 / 60);
    const durationMinutes = Math.floor(((durationMS - durationHours * 60 * 60 * 1000) / 1000 / 60) % 60);
    const durationString = (function () {
      if (durationHours < 10) {
        return '0' + durationHours + ':' + ('0' + durationMinutes).slice(-2);
      }
      return durationHours + ':' + ('0' + durationMinutes).slice(-2);
    })();
    if (targetCal == 'ical' || (targetCal == 'google' && !/GMT[+|-]\d{1,2}|Etc\/U|Etc\/Zulu|CET|CST6CDT|EET|EST|MET|MST|PST8PDT|WET/i.test(data.timeZone))) {
      return {
        start: atcb_format_datetime(newStartDate, 'clean', true, true),
        end: atcb_format_datetime(newEndDate, 'clean', true, true),
        duration: durationString,
        allday: false,
      };
    }
    const offsetStart = tzlib_get_offset(data.timeZone, data.startDate, data.startTime);
    const offsetEnd = tzlib_get_offset(data.timeZone, data.endDate, data.endTime);
    if (addTimeZoneOffset) {
      const formattedOffsetStart = offsetStart.slice(0, 3) + ':' + offsetStart.slice(3);
      const formattedOffsetEnd = offsetEnd.slice(0, 3) + ':' + offsetEnd.slice(3);
      return {
        start: newStartDate.toISOString().replace('.000Z', formattedOffsetStart),
        end: newEndDate.toISOString().replace('.000Z', formattedOffsetEnd),
        duration: durationString,
        allday: false,
      };
    }
    const calcOffsetStart = parseInt(offsetStart[0] + 1) * -1 * ((parseInt(offsetStart.substring(1, 3)) * 60 + parseInt(offsetStart.substring(3, 5))) * 60 * 1000);
    const calcOffsetEnd = parseInt(offsetEnd[0] + 1) * -1 * ((parseInt(offsetEnd.substring(1, 3)) * 60 + parseInt(offsetEnd.substring(3, 5))) * 60 * 1000);
    newStartDate.setTime(newStartDate.getTime() + calcOffsetStart);
    newEndDate.setTime(newEndDate.getTime() + calcOffsetEnd);
    return {
      start: atcb_format_datetime(newStartDate, style),
      end: atcb_format_datetime(newEndDate, style),
      duration: durationString,
      allday: false,
    };
  } else {
    const startDate = data.startDate.split('-');
    const endDate = data.endDate ? data.endDate.split('-') : startDate;
    const newStartDate = new Date(Date.UTC(startDate[0], startDate[1] - 1, startDate[2], 12, 0, 0));
    const newEndDate = new Date(Date.UTC(endDate[0], endDate[1] - 1, endDate[2], 12, 0, 0));
    if (targetCal === 'google' || (targetCal === 'microsoft' && !atcbIsMobile()) || targetCal === 'msteams' || targetCal === 'ical') {
      newEndDate.setDate(newEndDate.getDate() + 1);
    }
    if (targetCal === 'msteams') {
      if (atcbIsMobile()) {
        const offset = newStartDate.getTimezoneOffset();
        const formattedOffset = (function () {
          if (offset < 0) {
            return '+' + ('0' + Math.abs(offset / 60)).slice(-2) + ':' + ('0' + Math.abs(offset % 60)).slice(-2);
          } else {
            return '-' + ('0' + Math.abs(offset / 60)).slice(-2) + ':' + ('0' + Math.abs(offset % 60)).slice(-2);
          }
        })();
        return {
          start: atcb_format_datetime(newStartDate, style, false, true) + 'T00:00:00' + formattedOffset,
          end: atcb_format_datetime(newEndDate, style, false, true) + 'T00:00:00' + formattedOffset,
          allday: true,
        };
      }
      return {
        start: atcb_format_datetime(newStartDate, style, false, true) + '+00:00',
        end: atcb_format_datetime(newEndDate, style, false, true) + '+00:00',
        allday: true,
      };
    }
    return {
      start: atcb_format_datetime(newStartDate, style, false),
      end: atcb_format_datetime(newEndDate, style, false),
      allday: true,
    };
  }
}
function atcb_format_datetime(datetime, style = 'delimiters', includeTime = true, removeZ = false) {
  const regex = (function () {
    if (includeTime) {
      if (style == 'clean') {
        return /(-|:|(\.\d{3}))/g;
      }
      return /(\.\d{3})/g;
    }
    if (style == 'clean') {
      return /(-|T(\d{2}:\d{2}:\d{2}\.\d{3})Z)/g;
    }
    return /T(\d{2}:\d{2}:\d{2}\.\d{3})Z/g;
  })();
  const output = removeZ ? datetime.toISOString().replace(regex, '').replace('Z', '') : datetime.toISOString().replace(regex, '');
  return output;
}
function offsetToMilliseconds(offset) {
  const sign = offset[0] === '+' ? 1 : -1;
  const hours = parseInt(offset.substring(1, 3), 10);
  const minutes = parseInt(offset.substring(3, 5), 10);
  const totalMinutes = (hours * 60 + minutes) * sign;
  const milliseconds = totalMinutes * 60000;
  return milliseconds;
}
function atcb_translate_via_time_zone(date, time, baseTimeZone, targetTimeZone) {
  const dateTime = new Date(`${date}T${time}:00Z`);
  const offset = tzlib_get_offset(baseTimeZone, date, time); 
  const dateTimeUTC = new Date(dateTime.getTime() - offsetToMilliseconds(offset));
  const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: targetTimeZone,
    hourCycle: 'h23',
  });
  const dateInTargetTimeZone = formatter.format(dateTimeUTC);
  return ([date, time] = dateInTargetTimeZone.split(', '));
}
function atcb_generate_timestring(dates, language = 'en', subEvent = 'all', decorate = false, browserTimeOverride = false, enforceYear = false, hideTimeZone = false) {
  if (decorate) {
    dates = atcb_decorate_data_dates({ dates: dates }).dates;
  }
  let startDateInfo, endDateInfo, timeZoneInfoStart, timeZoneInfoEnd;
  let formattedTimeStart = {};
  let formattedTimeEnd = {};
  let timeBlocks = [];
  let timeZoneInfoStringStart = '';
  let timeZoneInfoStringEnd = '';
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (subEvent === 'all') {
    formattedTimeStart = atcb_generate_time(dates[0]);
    formattedTimeEnd = atcb_generate_time(dates[dates.length - 1]);
    timeZoneInfoStart = browserTimeOverride ? browserTimezone : dates[0].timeZone;
    timeZoneInfoEnd = browserTimeOverride ? browserTimezone : dates[dates.length - 1].timeZone;
  } else {
    formattedTimeStart = atcb_generate_time(dates[`${subEvent}`]);
    formattedTimeEnd = formattedTimeStart;
    timeZoneInfoStart = browserTimeOverride ? browserTimezone : dates[`${subEvent}`].timeZone;
    timeZoneInfoEnd = timeZoneInfoStart;
  }
  startDateInfo = new Date(formattedTimeStart.start);
  endDateInfo = new Date(formattedTimeEnd.end);
  if (formattedTimeStart.allday) {
    timeZoneInfoStart = 'GMT';
  }
  if (formattedTimeEnd.allday) {
    timeZoneInfoEnd = 'GMT';
  }
  const magicLocationPhrases = ['global', 'world-wide', 'worldwide', 'online'];
  const convertable = (function () {
    let i = 0;
    let j = dates.length - 1;
    if (subEvent != 'all') {
      i = j = subEvent;
    }
    for (i; i <= j; i++) {
      const magicLocation = (function () {
        if (dates[`${i}`].location && dates[`${i}`].location !== '') {
          if (magicLocationPhrases.includes(dates[`${i}`].location.toLowerCase().trim())) {
            return true;
          }
        }
        return false;
      })();
      if (!magicLocation && !dates[`${i}`].onlineEvent) {
        return false;
      }
    }
    return true;
  })();
  if (convertable) {
    timeZoneInfoStart = timeZoneInfoEnd = browserTimezone;
  } else {
    if (!formattedTimeStart.allday && browserTimezone !== timeZoneInfoStart && timeZoneInfoStart !== timeZoneInfoEnd) {
      timeZoneInfoStringStart = '(' + timeZoneInfoStart + ')';
    }
    if ((!formattedTimeEnd.allday && browserTimezone !== timeZoneInfoEnd) || timeZoneInfoStart !== timeZoneInfoEnd) {
      timeZoneInfoStringEnd = '(' + timeZoneInfoEnd + ')';
    }
  }
  const now = new Date();
  const dropYearStart = (function () {
    if (!enforceYear && startDateInfo.getFullYear() === now.getFullYear()) {
      return true;
    }
    return false;
  })();
  const dropYearEnd = (function () {
    if (!enforceYear && endDateInfo.getFullYear() === now.getFullYear()) {
      return true;
    }
    return false;
  })();
  const formatOptionsStart = get_format_options(timeZoneInfoStart, dropYearStart, language);
  const formatOptionsEnd = get_format_options(timeZoneInfoEnd, dropYearEnd, language);
  if (startDateInfo.toLocaleDateString(language, formatOptionsEnd.DateLong) === endDateInfo.toLocaleDateString(language, formatOptionsEnd.DateLong)) {
    if (formattedTimeStart.allday) {
      if (!dropYearStart) {
        timeBlocks.push(startDateInfo.toLocaleDateString(language, formatOptionsStart.DateLong));
      }
    } else {
      let timeString = '';
      if (dropYearStart) {
        timeString = startDateInfo.toLocaleString(language, formatOptionsStart.Time);
      } else {
        timeString = startDateInfo.toLocaleString(language, formatOptionsStart.DateTimeLong);
      }
      if (language === 'en') {
        timeString = timeString.replace(/:00/, '');
      }
      timeBlocks.push(timeString);
      if (timeZoneInfoStringStart !== '' && !hideTimeZone) {
        timeBlocks.push(timeZoneInfoStringStart);
      }
      timeBlocks.push('-');
      timeString = endDateInfo.toLocaleTimeString(language, formatOptionsEnd.Time);
      if (language === 'en') {
        timeString = timeString.replace(/:00/, '');
      }
      timeBlocks.push(timeString);
      if (timeZoneInfoStringEnd !== '' && !hideTimeZone) {
        timeBlocks.push(timeZoneInfoStringEnd);
      }
    }
  } else {
    if (formattedTimeStart.allday) {
      timeBlocks.push(startDateInfo.toLocaleDateString(language, formatOptionsStart.DateLong));
    } else {
      let timeString = '';
      if (dropYearStart) {
        timeString = startDateInfo.toLocaleString(language, formatOptionsStart.Time);
      } else {
        timeString = startDateInfo.toLocaleString(language, formatOptionsStart.DateTimeLong);
      }
      if (language === 'en') {
        timeString = timeString.replace(/:00/, '');
      }
      timeBlocks.push(timeString);
    }
    if (timeZoneInfoStringStart !== '' && !hideTimeZone) {
      timeBlocks.push(timeZoneInfoStringStart);
    }
    timeBlocks.push('-');
    if (formattedTimeEnd.allday) {
      timeBlocks.push(endDateInfo.toLocaleDateString(language, formatOptionsEnd.DateLong));
    } else {
      let timeString = endDateInfo.toLocaleString(language, formatOptionsEnd.DateTimeLong);
      if (language === 'en') {
        timeString = timeString.replace(/:00/, '');
      }
      timeBlocks.push(timeString);
    }
    if (timeZoneInfoStringEnd !== '' && !hideTimeZone) {
      timeBlocks.push(timeZoneInfoStringEnd);
    }
  }
  return timeBlocks;
}
function get_format_options(timeZoneInfo, dropYear = false, language = 'en') {
  const hoursFormat = (function () {
    if (language === 'en') {
      return 'h12'; 
    }
    return 'h23'; 
  })();
  if (dropYear) {
    return {
      DateLong: {
        timeZone: timeZoneInfo,
        month: 'short',
        day: 'numeric',
      },
      DateTimeLong: {
        timeZone: timeZoneInfo,
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: hoursFormat,
      },
      Time: {
        timeZone: timeZoneInfo,
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: hoursFormat,
      },
    };
  }
  return {
    DateLong: {
      timeZone: timeZoneInfo,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    DateTimeLong: {
      timeZone: timeZoneInfo,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hourCycle: hoursFormat,
    },
    Time: {
      timeZone: timeZoneInfo,
      hour: 'numeric',
      minute: '2-digit',
      hourCycle: hoursFormat,
    },
  };
}
function atcb_secure_content(data, isJSON = true) {
  const toClean = isJSON ? JSON.stringify(data) : data.toString();
  const cleanedUp = toClean.replace(/(<(?!br)([^>]+)>)/gi, '');
  if (isJSON) {
    return JSON.parse(cleanedUp);
  } else {
    return cleanedUp;
  }
}
function atcb_secure_url(url, throwError = true) {
  if (url && url.match(/((\.\.\/)|(\.\.\\)|(%2e%2e%2f)|(%252e%252e%252f)|(%2e%2e\/)|(%252e%252e\/)|(\.\.%2f)|(\.\.%252f)|(%2e%2e%5c)|(%252e%252e%255c)|(%2e%2e\\)|(%252e%252e\\)|(\.\.%5c)|(\.\.%255c)|(\.\.%c0%af)|(\.\.%25c0%25af)|(\.\.%c1%9c)|(\.\.%25c1%259c))/gi)) {
    if (throwError) {
      console.error('Seems like the generated URL includes at least one security issue and got blocked. Please check the calendar button parameters!');
    }
    return false;
  } else {
    return true;
  }
}
function atcb_validEmail(email) {
  if (!/^.{0,70}@.{1,30}\.[a-z]{2,9}$/i.test(email)) {
    return false;
  }
  return true;
}
function atcb_rewrite_html_elements(content, clear = false, iCalBreaks = false) {
  if (clear) {
    if (iCalBreaks) {
      content = content.replace(/(\[br\s?\/?\]|\{br\s?\/?\}|(\[\/p\](?=.))|(\{\/p\}(?=.)))/gi, '\\n');
    } else {
      content = content.replace(/(\[br\s?\/?\]|\{br\s?\/?\}|(\[\/p\](?=.))|(\{\/p\}(?=.)))/gi, ' ');
    }
    content = content.replace(/\[url\](.+?)\[\/url\]/gi, (match, p1) => {
      return p1.split('|')[0];
    });
    content = content.replace(/\{url\}(.+?)\{\/url\}/gi, (match, p1) => {
      return p1.split('|')[0];
    });
    content = content.replace(/\[\/?(hr|[pbui]|strong|em|li|ul|ol|h\d)\]/gi, '');
    content = content.replace(/\{\/?(hr|[pbui]|strong|em|li|ul|ol|h\d)\}/gi, '');
    content = content.replace(/&[#a-z0-9]{1,9};/gi, '');
  } else {
    content = content.replace(/\[url\]((?:(?!\[\/url\]).)*)\[\/url\]/gi, function (match, p1) {
      return atcb_parse_url_code(p1);
    });
    content = content.replace(/\{url\}((?:(?!\[\/url\]).)*)\{\/url\}/gi, function (match, p1) {
      return atcb_parse_url_code(p1);
    });
    content = content.replace(/\[(\/)?(br|hr|[pbui]|strong|em|li|ul|ol|h\d)(\s?\/?)\]/gi, '<$1$2$3>');
    content = content.replace(/\{(\/)?(br|hr|[pbui]|strong|em|li|ul|ol|h\d)(\s?\/?)\}/gi, '<$1$2$3>');
  }
  return content;
}
function atcb_parse_url_code(input) {
  const urlText = input.split('|');
  const text = (function () {
    if (urlText.length > 1 && urlText[1] != '') {
      return urlText[1];
    } else {
      return urlText[0];
    }
  })();
  return '<a href="' + urlText[0] + '" target="' + atcbDefaultTarget + '" rel="noopener">' + text + '</a>';
}
function atcb_rewrite_ical_text(content, inQuotes = false) {
  if (inQuotes) {
    content = content.replace(/"/g, '');
  } else {
    content = content.replace(/\\/g, '\\\\').replace(/(,|;)/g, '\\$1').replace(/\\\\n/g, '\\n');
  }
  return content;
}
function atcb_format_ical_lines(content) {
  const contentArr = content.split('\r\n');
  const result = [];
  for (let line of contentArr) {
    if (!line || line.length <= 65) {
      result.push(line);
      continue;
    }
    let currentLine = '';
    let position = 0;
    const foldedLines = [];
    while (position < line.length) {
      const char = line.charAt(position);
      const isHighSurrogate = char.charCodeAt(0) >= 0xd800 && char.charCodeAt(0) <= 0xdbff;
      const isEscapedChar = position > 0 && line.charAt(position - 1) === '\\';
      if ((currentLine + char).length > 65 && !isHighSurrogate && !isEscapedChar) {
        foldedLines.push(currentLine);
        currentLine = '';
      }
      currentLine += char;
      position++;
      if (isHighSurrogate && position < line.length) {
        currentLine += line.charAt(position);
        position++;
      }
    }
    if (currentLine.length > 0) {
      foldedLines.push(currentLine);
    }
    result.push(foldedLines[0]);
    for (let i = 1; i < foldedLines.length; i++) {
      result.push(' ' + foldedLines[`${i}`]);
    }
  }
  return result.join('\r\n');
}
function atcb_position_list(host, trigger, list, blockUpwards = false, blockDownwards = false) {
  let anchorSet = false;
  const originalTrigger = trigger;
  if (trigger.querySelector('.atcb-dropdown-anchor') !== null) {
    trigger = trigger.querySelector('.atcb-dropdown-anchor');
    anchorSet = true;
  }
  list.style.position = 'relative';
  list.style.display = 'inline-block';
  let triggerDim = trigger.getBoundingClientRect();
  const btnDim = originalTrigger.getBoundingClientRect();
  const btnParentDim = originalTrigger.parentNode.getBoundingClientRect();
  const viewportHeight = document.documentElement.clientHeight;
  if (anchorSet === true && !list.classList.contains('atcb-dropoverlay')) {
    let listDim = list.getBoundingClientRect();
    list.style.width = listDim.width + 'px';
    if (list.classList.contains('atcb-dropup') || (!blockUpwards && triggerDim.top + listDim.height > viewportHeight - 20 && 2 * btnDim.top + btnDim.height - triggerDim.top - listDim.height > 20) || blockDownwards) {
      originalTrigger.classList.add('atcb-dropup');
      list.classList.add('atcb-dropup');
      list.style.bottom = btnParentDim.bottom - btnDim.bottom + (triggerDim.top - btnDim.top) + 'px';
    } else {
      list.style.top = btnDim.top - btnParentDim.top + (triggerDim.top - btnDim.top) + 'px';
      if (originalTrigger.classList.contains('atcb-dropup')) {
        originalTrigger.classList.remove('atcb-dropup');
      }
    }
    triggerDim = trigger.getBoundingClientRect();
    if (!list.classList.contains('atcb-style-simple') && !list.classList.contains('atcb-style-round') && !list.classList.contains('atcb-style-text') && !list.classList.contains('atcb-style-neumorphism')) {
      list.style.minWidth = triggerDim.width + 'px';
      if (list.classList.contains('atcb-dropdown')) {
        list.style.maxWidth = triggerDim.width + 'px';
      }
    }
    listDim = list.getBoundingClientRect();
    list.style.left = Math.round(triggerDim.left - btnParentDim.left - (listDim.width - triggerDim.width) / 2) + 'px';
  } else {
    list.style.minWidth = btnDim.width + 20 + 'px';
    const listDim = list.getBoundingClientRect();
    list.style.width = listDim.width + 'px';
    const sideMargin = Math.round((btnDim.width - listDim.width) / 2);
    list.style.margin = -Math.round((listDim.height + btnDim.height) / 2) + 'px ' + sideMargin + 'px 0 ' + sideMargin + 'px';
  }
  list.style.position = 'absolute';
  list.style.display = 'block';
  const atcbL = host.querySelector('#atcb-reference');
  if (atcbL) {
    if (originalTrigger.classList.contains('atcb-dropup')) {
      originalTrigger.parentNode.after(atcbL);
      atcbL.classList.add('atcb-dropup');
    }
  }
}
function atcb_position_shadow_button(originalShadowHost, modalShadowHost) {
  const wrapperDim = originalShadowHost.querySelector('.atcb-initialized ').getBoundingClientRect();
  const newWrapper = modalShadowHost.querySelector('.atcb-initialized');
  let widthVal = wrapperDim.width;
  if (wrapperDim.width < 250) {
    widthVal = 250;
  }
  newWrapper.style.width = widthVal + 'px';
  newWrapper.style.height = wrapperDim.height + 'px';
  newWrapper.style.top = wrapperDim.top + 'px';
  newWrapper.style.left = wrapperDim.left + 'px';
}
function atcb_position_shadow_button_listener() {
  const active = atcbStates['active'];
  if (active !== null && active !== '') {
    const originalEl = document.querySelector('add-to-calendar-button[atcb-button-id=' + active + ']').shadowRoot;
    const shadowEl = document.querySelector('div[atcb-button-id=' + active + ']').shadowRoot;
    atcb_position_shadow_button(originalEl, shadowEl);
  }
}
function atcb_manage_body_scroll(host, modalObj = null) {
  const modal = (function () {
    if (modalObj != null) {
      return modalObj;
    } else {
      const allModals = host.querySelectorAll('.atcb-modal');
      if (allModals.length === 0) {
        return null;
      }
      return allModals[allModals.length - 1];
    }
  })();
  if (modal == null) {
    return;
  }
  const modalDim = modal.getBoundingClientRect();
  if (modalDim.height + 150 > window.innerHeight) {
    document.body.classList.add('atcb-modal-no-scroll');
    document.documentElement.classList.add('atcb-modal-no-scroll');
  } else {
    document.body.classList.remove('atcb-modal-no-scroll');
    document.documentElement.classList.remove('atcb-modal-no-scroll');
  }
}
function atcb_set_fullsize(el) {
  el.style.width = window.innerWidth + 'px';
  el.style.height = window.innerHeight + 100 + 'px';
}
function atcb_set_sizes(el, sizes) {
  el.style.setProperty('--base-font-size-l', sizes['l'] + 'px');
  el.style.setProperty('--base-font-size-m', sizes['m'] + 'px');
  el.style.setProperty('--base-font-size-s', sizes['s'] + 'px');
}
function atcb_generate_uuid() {
  const id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
  return id;
}
function atcb_apply_transformation(value, transform) {
  if (!transform || !value) return value;
  switch (transform) {
    case 'upper':
      return value.toString().toUpperCase();
    case 'lower':
      return value.toString().toLowerCase();
    default:
      return value;
  }
}
function atcb_copy_to_clipboard(dataString) {
  const tmpInput = document.createElement('input');
  document.body.append(tmpInput);
  const editable = tmpInput.contentEditable;
  const readOnly = tmpInput.readOnly;
  tmpInput.contentEditable = true;
  tmpInput.readOnly = false;
  tmpInput.value = dataString;
  if (atcbIsiOS()) {
    var range = document.createRange();
    range.selectNodeContents(tmpInput);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    tmpInput.setSelectionRange(0, 999999);
  } else {
    tmpInput.select();
  }
  tmpInput.contentEditable = editable;
  tmpInput.readOnly = readOnly;
  document.execCommand('copy');
  tmpInput.remove();
}
function atcb_debounce(func, timeout = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function atcb_debounce_leading(func, timeout = 300) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}


function atcb_log_event(event, trigger, identifier) {
  const parentEl = (function () {
    const customTrigger = document.getElementById(identifier);
    if (customTrigger) {
      return customTrigger;
    }
    return document.querySelector('[atcb-button-id="' + identifier + '"]');
  })();
  if (parentEl) {
    parentEl.setAttribute('atcb-last-event', event + ':' + trigger);
  }
  if (atcbIsBrowser()) {
    atcb_push_to_data_layer(event, trigger);
  }
}
function atcb_push_to_data_layer(event, trigger) {
  let action = '';
  switch (event) {
    case 'initialization':
      action = 'Initialized';
      break;
    case 'openList':
      action = 'Opened';
      break;
    case 'closeList':
      action = 'Closed';
      break;
    case 'openCalendarLink':
      action = 'Opened';
      break;
    case 'openSingletonLink':
      action = 'Opened';
      break;
    case 'openSubEventLink':
      action = 'Opened';
      break;
    case 'openRSVP':
      action = 'Opened';
      break;
    case 'success':
      action = 'Saved';
      break;
    case 'successRSVP':
      action = 'Saved';
      break;
  }
  const category = event === 'openRSVP' || event === 'successRSVP' ? 'Add-to-Calendar-RSVP' : 'Add-to-Calendar-Button';
  const atcbDataLayer = (window.dataLayer = window.dataLayer || []);
  atcbDataLayer.push({
    eventCategory: category,
    eventAction: action,
    eventLabel: trigger,
    event: event,
  });
}


/* How to add new languages:
 * 1. Duplicate the "en" block at the following "i18nStrings" object.
 * 2. Change the key to the ISO 639-1 code of your language (https://www.w3schools.com/tags/ref_language_codes.asp).
 * 3. Translate the labels.
 * 4. Add the language to the "rtlLanguages" array below, if it write from right to left.
 * 4. Update the "language" part at the configuration page of the demo page - add the new lagnuages to the "Options" info (/demo/pages/configuration.vue).
 * 5. Also update the language.ts file at the demo page, so the language appears at the demo playground (/demo/src/components/models/language.ts).
 */
const rtlLanguages = ['ar', 'fa'];
const calendarNames = {
  apple: 'Apple',
  google: 'Google',
  ms365: 'Microsoft 365',
  msteams: 'Microsoft Teams',
  outlookcom: 'Outlook.com',
  yahoo: 'Yahoo',
};
const i18nStrings = {
  en: {
    'label.addtocalendar': 'Add to Calendar',
    ical: 'iCal File',
    ...calendarNames,
    'modal.button.default': 'Click me',
    'modal.webview.ical.h': 'Open your browser',
    'modal.webview.ical.text': 'Unfortunately, in-app browsers have problems with the way we generate the calendar file.',
    'modal.clipboard.text': 'We automatically copied a magical URL into your clipboard.',
    'modal.webview.ical.steps': '<ol><li><strong>Open another browser</strong> on your phone, ...</li><li><strong>Paste</strong> the clipboard content and go.</li></ol>',
    'modal.opensafari.ical.h': 'Open Safari',
    'modal.opensafari.ical.text': 'Unfortunately, iOS has some problems generating and opening the calendar file outside of Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Open Safari</strong>, ...</li><li><strong>Paste</strong> the clipboard content and go.</li></ol>',
    'modal.multidate.h': 'This is an event series',
    'modal.multidate.text': 'Add the individual events one by one:',
    'date.status.cancelled': 'This date got cancelled.',
    'date.status.cancelled.cta': 'Please update your calendar!',
    'modal.subscribe.yahoo.h': 'Add Calendar to Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Open now the Yahoo Calendar.</li><li>Click the "Actions" tab.</li><li>Hit "Follow Other Calendars".</li><li>Set a name and paste the clipboard content into the url field.</li></ol>',
    'modal.subscribe.yahoo.button': 'Open Yahoo Calendar',
    close: 'Close',
    continue: 'Continue',
    cancel: 'Cancel',
    expired: 'Expired',
    recurring: 'Recurring',
    thankyou: 'Thank you',
    submit: 'Submit',
    'label.rsvp': 'RSVP',
    'label.share.email': 'Share via Email',
    'label.share.copy': 'Copy Link',
    'label.share.copied': 'Copied',
    'label.share.email.subject': 'Save this event',
    'form.error.required': 'You did not properly fill all required fields',
    'form.error.sending': 'There was a problem sending your response. Please try again later',
    'form.success': 'Sent successfully!',
  },
  de: {
    'label.addtocalendar': 'Im Kalender speichern',
    ical: 'iCal-Datei',
    ...calendarNames,
    'modal.button.default': 'Klick mich',
    'modal.webview.ical.h': 'Öffne deinen Browser',
    'modal.webview.ical.text': 'Leider haben In-App-Browser Probleme mit der Art, wie wir Kalender-Dateien erzeugen.',
    'modal.clipboard.text': 'Wir haben automatisch eine magische URL in deine Zwischenablage kopiert.',
    'modal.webview.ical.steps': '<ol><li><strong>Öffne einen anderen Browser</strong> auf deinem Smartphone, ...</li><li>Nutze die <strong>Einfügen</strong>-Funktion, um fortzufahren.</li></ol>',
    'modal.opensafari.ical.h': 'Öffne Safari',
    'modal.opensafari.ical.text': 'Leider hat iOS einige Probleme beim Generieren und Öffnen der Kalenderdatei außerhalb von Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Öffne Safari</strong>, ...</li><li>Nutze die <strong>Einfügen</strong>-Funktion, um fortzufahren.</li></ol>',
    'modal.multidate.h': 'Dies ist eine Termin-Reihe',
    'modal.multidate.text': 'Füge die einzelnen Termine der Reihe nach deinem Kalender hinzu:',
    'date.status.cancelled': 'Dieser Termin wurde abgesagt.',
    'date.status.cancelled.cta': 'Bitte aktualisiere deinen Kalender!',
    'modal.subscribe.yahoo.h': 'Kalender zu Yahoo hinzufügen',
    'modal.subscribe.yahoo.text': '<ol><li>Öffne den Yahoo-Kalender.</li><li>Klicke auf den "Aktionen"-Tab.</li><li>Wähle "Weiteren Kalendern folgen".</li><li>Wähle einen Namen und füge die URL aus deiner Zwischenablage in das URL-Feld ein.</li></ol>',
    'modal.subscribe.yahoo.button': 'Yahoo-Kalender öffnen',
    close: 'Schließen',
    continue: 'Weiter',
    cancel: 'Abbrechen',
    expired: 'Abgelaufen',
    recurring: 'Wiederkehrend',
    thankyou: 'Danke',
    submit: 'Absenden',
    'label.share.email': 'Per E-Mail teilen',
    'label.share.copy': 'Link kopieren',
    'label.share.copied': 'Kopiert',
    'label.share.email.subject': 'Merke dir diesen Termin',
    'form.error.required': 'Du hast nicht alle erforderlichen Felder korrekt ausgefüllt',
    'form.error.sending': 'Es gab ein Problem beim Senden deiner Antwort. Bitte versuche es später noch einmal',
    'form.success': 'Erfolgreich gesendet!',
  },
  es: {
    'label.addtocalendar': 'Añadir al Calendario',
    ical: 'iCal Ficha',
    ...calendarNames,
    'modal.button.default': 'Haz clic mí',
    'modal.webview.ical.h': 'Abra su browser',
    'modal.webview.ical.text': 'Lamentablemente, los browsers in-app tienen problemas con la forma en que generamos el archivo del calendario.',
    'modal.clipboard.text': 'Hemos copiado automáticamente una URL mágica en su portapapeles.',
    'modal.webview.ical.steps': '<ol><li><strong>Abre otro browser</strong> en tu smartphone, ...</li><li>Utilice la función de <strong>pegar</strong> para continuar.</li></ol>',
    'modal.opensafari.ical.h': 'Abrir Safari',
    'modal.opensafari.ical.text': 'Desafortunadamente, iOS tiene algunos problemas para generar y abrir el archivo de calendario fuera de Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Abrir Safari</strong>, ...</li><li>Utilice la función de <strong>pegar</strong> para continuar.</li></ol>',
    'modal.multidate.h': 'Esta es una serie de fechas',
    'modal.multidate.text': 'Añada las fechas individuales a su calendario en orden:',
    'date.status.cancelled': 'Esta fecha fue cancelada.',
    'date.status.cancelled.cta': 'Actualice su calendario!',
    'modal.subscribe.yahoo.h': 'Añadir calendario a Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Abra el calendario de Yahoo.</li><li>Haga clic en la pestaña "Acciones".</li><li>Seleccione "Seguir otros calendarios".</li><li>Elige un nombre y pega la URL de tu portapapeles en el campo URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Abrir calendario de Yahoo',
    close: 'Ciérralo',
    continue: 'Continuar',
    cancel: 'Cancelar',
    expired: 'Caducada',
    recurring: 'Periódica',
    thankyou: 'Gracias',
    submit: 'Enviar',
    'label.share.email': 'Compartir por E-mail',
    'label.share.copy': 'Copiar enlace',
    'label.share.copied': 'Copiado',
    'label.share.email.subject': 'Recuerda esta fecha',
    'form.error.required': 'No has completado correctamente todos los campos requeridos',
    'form.error.sending': 'Hubo un problema al enviar tu respuesta. Por favor, inténtalo de nuevo más tarde',
    'form.success': 'Enviado con éxito!',
  },
  pt: {
    'label.addtocalendar': 'Incluir no Calendário',
    ical: 'Ficheiro iCal',
    ...calendarNames,
    'modal.button.default': 'Clicar-me',
    'modal.webview.ical.h': 'Abra o seu browser',
    'modal.webview.ical.text': 'Infelizmente, os navegadores em tampas têm problemas com a forma como geramos o ficheiro de calendário.',
    'modal.clipboard.text': 'Copiámos automaticamente um URL mágico para a sua área de transferência.',
    'modal.webview.ical.steps': '<ol><li><strong>Abrir outro browser</strong> en tu smartphone, ...</li><li>Use a função <forte>colar</strong> para continuar.</li></ol>',
    'modal.opensafari.ical.h': 'Safari aberto',
    'modal.opensafari.ical.text': 'Infelizmente, o iOS tem alguns problemas para gerar e abrir o arquivo de calendário fora do Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Safari aberto</strong>, ...</li><li>Use a função <forte>colar</strong> para continuar.</li></ol>',
    'modal.multidate.h': 'Esta é uma série de datas',
    'modal.multidate.text': 'Adicione as datas individuais ao seu calendário, por ordem:',
    'date.status.cancelled': 'Esta data foi cancelada.',
    'date.status.cancelled.cta': 'Actualize o seu calendário!',
    'modal.subscribe.yahoo.h': 'Adicionar calendário ao Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Abrir o calendário do Yahoo.</li><li>Clique no separador "Acções".</li><li>Seleccione "Seguir outros calendários".</li><li>Escolha um nome e cole o URL da sua área de transferência no campo URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Abra o Calendário do Yahoo',
    close: 'Fechar',
    continue: 'Continuar',
    cancel: 'Cancelar',
    expired: 'Expirada',
    recurring: 'Recorrente',
    thankyou: 'Obrigado',
    submit: 'Enviar',
    'label.share.email': 'Compartilhar por e-mail',
    'label.share.copy': 'Copiar link',
    'label.share.copied': 'Copiado',
    'label.share.email.subject': 'Lembre-se desta data',
    'form.error.required': 'Você não preencheu todos os campos obrigatórios corretamente',
    'form.error.sending': 'Houve um problema ao enviar sua resposta. Por favor, tente novamente mais tarde',
    'form.success': 'Enviado com sucesso!',
  },
  fr: {
    'label.addtocalendar': "Ajouter à l'Agenda",
    ical: 'Fichier iCal',
    ...calendarNames,
    'modal.button.default': 'Cliquez-moi',
    'modal.webview.ical.h': 'Ouvrez votre navigateur',
    'modal.webview.ical.text': 'Malheureusement, les navigateurs intégrés aux applications ont des problèmes avec la manière dont nous créons les fichiers de calendrier.',
    'modal.clipboard.text': 'Nous avons automatiquement copié une URL magique dans votre presse-papier.',
    'modal.webview.ical.steps': '<ol><li><strong>Ouvrez un autre navigateur</strong> sur votre smartphone ;</li><li><strong>Collez</strong> le contenu du presse-papier et continuez.</li></ol>',
    'modal.opensafari.ical.h': 'Ouvrir Safari',
    'modal.opensafari.ical.text': 'Malheureusement, iOS rencontre des problèmes pour générer et ouvrir le fichier de calendrier en dehors de Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Ouvrez Safari</strong> ;</li><li><strong>Collez</strong> le contenu du presse-papier et continuez.</li></ol>',
    'modal.multidate.h': 'Ceci est une liste d’évènements',
    'modal.multidate.text': 'Ajouter les évènements un par un :',
    'date.status.cancelled': 'Cet évènement est annulé.',
    'date.status.cancelled.cta': 'Actualisez votre agenda !',
    'modal.subscribe.yahoo.h': 'Ajouter un agenda à Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Ouvrez l’Agenda Yahoo ;</li><li>Cliquez sur l’onglet « Actions » ;</li><li>Sélectionnez « Suivre d’autres agendas » ;</li><li>Choisissez un nom et collez le contenu de votre presse-papier dans le champ URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Ouvrir le calendrier Yahoo',
    close: 'Fermer',
    continue: 'Continuer',
    cancel: 'Annuler',
    expired: 'Expiré',
    recurring: 'Récurrent',
    thankyou: 'Merci',
    submit: 'Envoyer',
    'label.share.email': 'Partager par E-mail',
    'label.share.copy': 'Copier le lien',
    'label.share.copied': 'Copié',
    'label.share.email.subject': 'Retenez cette date',
    'form.error.required': "Tu n'as pas correctement rempli tous les champs requis",
    'form.error.sending': "Il y a eu un problème lors de l'envoi de ta réponse. Veuillez réessayer plus tard",
    'form.success': 'Envoyé avec succès!',
  },
  nl: {
    'label.addtocalendar': 'Opslaan in Agenda',
    ical: 'iCal File',
    ...calendarNames,
    'modal.button.default': 'Klik me',
    'modal.webview.ical.h': 'Open uw browser',
    'modal.webview.ical.text': 'Helaas hebben in-app browsers problemen met de manier waarop wij kalenderbestanden maken.',
    'modal.clipboard.text': 'We hebben automatisch een magische URL naar je klembord gekopieerd.',
    'modal.webview.ical.steps': '<ol><li><strong>Open een andere browser</strong> op uw smartphone, ...</li><li>Gebruik de <strong>insert</strong> functie om verder te gaan.</li></ol>',
    'modal.opensafari.ical.h': 'Open Safari',
    'modal.opensafari.ical.text': 'Helaas heeft iOS enkele problemen met het genereren en openen van het agendabestand buiten Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Open Safari</strong>, ...</li><li>Gebruik de <strong>insert</strong> functie om verder te gaan.</li></ol>',
    'modal.multidate.h': 'Dit is een reeks data',
    'modal.multidate.text': 'Voeg de afzonderlijke delen één voor één toe:',
    'date.status.cancelled': 'Deze datum is geannuleerd.',
    'date.status.cancelled.cta': 'Uw agenda bijwerken!',
    'modal.subscribe.yahoo.h': 'Toevoegen aan Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Open de Yahoo calendar.</li><li>Klik op de "Acties" tab.</li><li>Selecteer "Volg Andere Agenda\'s".</li><li>Kies een naam en plak de URL van uw klembord in het URL-veld.</li></ol>',
    'modal.subscribe.yahoo.button': 'Open Yahoo Agenda',
    close: 'Sluiten',
    continue: 'Doorgaan',
    cancel: 'Annuleren',
    expired: 'Verlopen',
    recurring: 'Terugkerend',
    thankyou: 'Bedankt',
    submit: 'Versturen',
    'label.share.email': 'Delen via E-mail',
    'label.share.copy': 'Link kopiëren',
    'label.share.copied': 'Gekopieerd',
    'label.share.email.subject': 'Onthoud deze datum',
    'form.error.required': 'Je hebt niet alle vereiste velden correct ingevuld',
    'form.error.sending': 'Er was een probleem met het versturen van je antwoord. Probeer het later opnieuw',
    'form.success': 'Succesvol verstuurd!',
  },
  tr: {
    'label.addtocalendar': 'Takvime Ekle',
    ical: 'iCal Dosyası',
    ...calendarNames,
    'modal.button.default': 'Beni tıklayın',
    'modal.webview.ical.h': 'Tarayıcınızı açın',
    'modal.webview.ical.text': 'Ne yazık ki, uygulama içi tarayıcılar takvim dosyalarını oluşturma şeklimizle ilgili sorunlar yaşıyor.',
    'modal.clipboard.text': 'Panonuza otomatik olarak sihirli bir URL kopyaladık.',
    'modal.webview.ical.steps': '<ol><li><strong>Akıllı telefonunuzda başka bir tarayıcı açın</strong>, ...</li><li>Devam etmek için <strong>insert</strong> fonksiyonunu kullanın.</li></ol>',
    'modal.opensafari.ical.h': 'Açık Safari',
    'modal.opensafari.ical.text': 'Ne yazık ki iOS, takvim dosyasını Safari dışında oluştururken ve açarken bazı sorunlar yaşıyor.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Açık Safari</strong>, ...</li><li>Devam etmek için <strong>insert</strong> fonksiyonunu kullanın.</li></ol>',
    'modal.multidate.h': 'Bu bir etkinlik serisidir',
    'modal.multidate.text': 'Parçaları teker teker ekleyin:',
    'date.status.cancelled': 'Bu tarih iptal edildi.',
    'date.status.cancelled.cta': 'Lütfen takviminizi güncelleyin!',
    'modal.subscribe.yahoo.h': "Yahoo'ya takvim ekleme",
    'modal.subscribe.yahoo.text': '<ol><li>Yahoo takvimini açın.</li><li>"Eylemler" sekmesine tıklayın.</li><li>"Diğer Takvimleri Takip Et" öğesini seçin.</li><li>Bir ad seçin ve URL\'yi panonuzdan URL alanına yapıştırın.</li></ol>',
    'modal.subscribe.yahoo.button': 'Yahoo Takvimini aç',
    close: 'Kapat',
    continue: 'Devam etmek',
    cancel: 'İptal',
    expired: 'Günü geçmiş',
    recurring: 'Yinelenen',
    thankyou: 'Teşekkürler',
    submit: 'Gönder',
    'label.share.email': 'E-posta ile Paylaş',
    'label.share.copy': 'Bağlantıyı Kopyala',
    'label.share.copied': 'Kopyalandı',
    'label.share.email.subject': 'Bu Tarihi Unutma',
    'form.error.required': 'Gerekli tüm alanları doğru şekilde doldurmadınız',
    'form.error.sending': 'Yanıtınızı gönderirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin',
    'form.success': 'Başarıyla gönderildi!',
  },
  zh: {
    'label.addtocalendar': '添加到日历',
    ical: 'iCal 文件',
    ...calendarNames,
    'modal.button.default': '点我',
    'modal.webview.ical.h': '打开浏览器',
    'modal.webview.ical.text': '不幸的是，应用内浏览器在我们生成日历文件的方式上存在问题。',
    'modal.clipboard.text': '我们自动将魔术 URL 复制到您的剪贴板。',
    'modal.webview.ical.steps': '<ol><li>打开手机上的任何其他浏览器, ...</li><li>粘贴剪贴板内容并开始。</li></ol>',
    'modal.opensafari.ical.h': '打开 Safari',
    'modal.opensafari.ical.text': '不幸的是，iOS 在 Safari 之外生成和打开日历文件时遇到一些问题。',
    'modal.opensafari.ical.steps': '<ol><li><strong>打开 Safari</strong>, ...</li><li>粘贴剪贴板内容并开始。</li></ol>',
    'modal.multidate.h': '这是一个活动系列',
    'modal.multidate.text': '逐个添加各个部分:',
    'date.status.cancelled': '此日期已取消。',
    'date.status.cancelled.cta': '请更新您的日历!',
    'modal.subscribe.yahoo.h': '将日历添加到 Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>打开 Yahoo 日历。</li><li>点击“操作”标签。</li><li>选择“关注其他日历”。</li><li>选择一个名称并将剪贴板中的 URL 粘贴到 URL 字段中。</li></ol>',
    'modal.subscribe.yahoo.button': '打开雅虎日历',
    close: '关',
    continue: '继续',
    cancel: '中止',
    expired: '已到期',
    recurring: '再次发生的',
    thankyou: '谢谢',
    submit: '提交',
    'label.share.email': '通过电子邮件分享',
    'label.share.copy': '复制链接',
    'label.share.copied': '已复制',
    'label.share.email.subject': '记住这个日期',
    'form.error.required': '你没有正确填写所有必填字段',
    'form.error.sending': '发送你的回复时出现问题。请稍后再试',
    'form.success': '成功发送！',
  },
  ar: {
    'label.addtocalendar': 'إضافة إلى التقويم',
    ical: 'ملف iCal',
    ...calendarNames,
    'modal.button.default': 'انقر فوق لي',
    'modal.webview.ical.h': 'افتح المستعرض الخاص بك',
    'modal.webview.ical.text': 'لسوء الحظ ، تواجه المتصفحات داخل التطبيق مشاكل في طريقة إنشاء ملف التقويم.',
    'modal.clipboard.text': 'قمنا تلقائيًا بنسخ عنوان URL سحري إلى الحافظة الخاصة بك.',
    'modal.webview.ical.steps': '<ol><li>افتح أي متصفح آخر على هاتفك الذكي, ...</li><li>.الصق محتوى الحافظة واذهب</li></ol>',
    'modal.opensafari.ical.h': 'افتح Safari',
    'modal.opensafari.ical.text': 'لسوء الحظ ، يواجه iOS بعض المشكلات في إنشاء ملف التقويم وفتحه خارج Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>افتح Safari</strong>, ...</li><li>الصق محتوى الحافظة واذهب.</li></ol>',
    'modal.multidate.h': 'هذه سلسلة أحداث',
    'modal.multidate.text': 'أضف الأجزاء الفردية واحدة تلو الأخرى:',
    'date.status.cancelled': 'تم إلغاء هذا التاريخ.',
    'date.status.cancelled.cta': 'الرجاء تحديث التقويم الخاص بك!',
    'modal.subscribe.yahoo.h': 'أضف التقويم إلى Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>افتح تقويم Yahoo.</li><li>انقر فوق علامة التبويب "الإجراءات".</li><li>حدد "متابعة تقويمات أخرى".</li><li>اختر اسمًا والصق عنوان URL من الحافظة الخاصة بك في حقل URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'افتح تقويم ياهو',
    close: 'قريب',
    continue: 'استمر',
    cancel: 'إحباط',
    expired: 'منتهي الصلاحية',
    recurring: 'يتكرر',
    thankyou: 'شكرا',
    submit: 'إرسال',
    'label.share.email': 'مشاركة عبر البريد الإلكتروني',
    'label.share.copy': 'نسخ الرابط',
    'label.share.copied': 'تم النسخ',
    'label.share.email.subject': 'تذكر هذا الموعد',
    'form.error.required': 'لم تقم بملء جميع الحقول المطلوبة بشكل صحيح',
    'form.error.sending': 'حدثت مشكلة أثناء إرسال ردك. الرجاء المحاولة لاحقاً',
    'form.success': 'تم الإرسال بنجاح!',
  },
  hi: {
    'label.addtocalendar': 'कैलेंडर में जोड़ें',
    ical: 'iCal फ़ाइल',
    ...calendarNames,
    'modal.button.default': 'मुझे क्लिक करें',
    'modal.webview.ical.h': 'अपना ब्राउज़र खोलें',
    'modal.webview.ical.text': 'दुर्भाग्य से, इन-ऐप ब्राउज़र में कैलेंडर फ़ाइल बनाने के तरीके में समस्याएँ हैं।',
    'modal.clipboard.text': 'हमने आपके क्लिपबोर्ड पर स्वचालित रूप से एक जादुई URL कॉपी कर लिया है।',
    'modal.webview.ical.steps': '<ol><li>अपने फ़ोन पर <strong>दूसरा ब्राउज़र खोलें</strong>, ...</li><li>क्लिपबोर्ड सामग्री <strong>चिपकाएं</strong> और जाएं।</li></ol>',
    'modal.opensafari.ical.h': 'सफारी खोलें',
    'modal.opensafari.ical.text': 'दुर्भाग्य से, iOS में सफ़ारी के बाहर कैलेंडर फ़ाइल बनाने और खोलने में कुछ समस्याएँ हैं।',
    'modal.opensafari.ical.steps': '<ol><li><strong>सफारी खोलें</strong>, ...</li><li>क्लिपबोर्ड सामग्री <strong>चिपकाएं</strong> और जाएं।</li></ol>',
    'modal.multidate.h': 'यह एक इवेंट सीरीज़ है',
    'modal.multidate.text': 'अलग-अलग हिस्सों को एक-एक करके जोड़ें:',
    'date.status.cancelled': 'यह तिथि रद्द हो गई।',
    'date.status.cancelled.cta': 'कृपया अपना कैलेंडर अपडेट करें!',
    'modal.subscribe.yahoo.h': 'Yahoo . में कैलेंडर जोड़ें',
    'modal.subscribe.yahoo.text': '<ol><li>Yahoo कैलेंडर खोलें।</li><li>"कृती" टैब पर क्लिक करें।</li><li>"इतर कॅलेंडर्सचे अनुसरण करा" चुनें।</li><li>एक नाम चुनें और अपने क्लिपबोर्ड से URL को URL फ़ील्ड में पेस्ट करें।</li></ol>',
    'modal.subscribe.yahoo.button': 'याहू कैलेंडर खोलें',
    close: 'बंद करना',
    continue: 'जारी रखें',
    cancel: 'रद्द करना',
    expired: 'खत्म हो चुका',
    recurring: 'पुनरावर्ती',
    thankyou: 'धन्यवाद',
    submit: 'जमा करें',
    'label.share.email': 'ईमेल के माध्यम से साझा करें',
    'label.share.copy': 'लिंक कॉपी करें',
    'label.share.copied': 'कॉपी हो गया',
    'label.share.email.subject': 'इस तारीख को याद रखें',
    'form.error.required': 'आपने सभी आवश्यक फ़ील्ड सही ढंग से नहीं भरी हैं',
    'form.error.sending': 'आपका जवाब भेजते समय एक समस्या हुई। कृपया बाद में पुनः प्रयास करें',
    'form.success': 'सफलतापूर्वक भेजा गया!',
  },
  pl: {
    'label.addtocalendar': 'Dodaj do kalendarza',
    ical: 'Plik iCal',
    ...calendarNames,
    'modal.button.default': 'Kliknij mnie',
    'modal.webview.ical.h': 'Otwórz przeglądarkę',
    'modal.webview.ical.text': 'Niestety, przeglądarki in-app mają problemy ze sposobem, w jaki generujemy plik kalendarza.',
    'modal.clipboard.text': 'Automatycznie skopiowaliśmy magiczny adres URL do schowka.',
    'modal.webview.ical.steps': '<ol><li><strong>Otwórz inną przeglądarkę</strong> w swoim telefonie, ...</li><li><strong>Wklej</strong> zawartość schowka i ruszaj.</li></ol>',
    'modal.opensafari.ical.h': 'Otwórz Safari',
    'modal.opensafari.ical.text': 'Niestety iOS ma pewne problemy z generowaniem i otwieraniem pliku kalendarza poza Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Otwórz Safari</strong>, ...</li><li><strong>Wklej</strong> zawartość schowka i ruszaj.</li></ol>',
    'modal.multidate.h': 'To jest cykl imprez',
    'modal.multidate.text': 'Dodawać po kolei poszczególne części:',
    'date.status.cancelled': 'Ta data została odwołana.',
    'date.status.cancelled.cta': 'Zaktualizuj swój kalendarz!',
    'modal.subscribe.yahoo.h': 'Dodaj kalendarz do Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Otwórz kalendarz Yahoo.</li><li>Kliknij na zakładkę "Czynności".</li><li>Wybierz "Obserwuj inne kalendarze".</li><li>Wybierz nazwę i wklej adres URL ze schowka w polu URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Otwórz kalendarz Yahoo',
    close: 'Zamknij',
    continue: 'Kontynuować',
    cancel: 'Anuluj',
    expired: 'Wygasły',
    recurring: 'Powtarzający się',
    thankyou: 'Dziękuję',
    submit: 'Wyślij',
    'label.share.email': 'Udostępnij przez e-mail',
    'label.share.copy': 'Kopiuj link',
    'label.share.copied': 'Skopiowane',
    'label.share.email.subject': 'Zapamiętaj tę datę',
    'form.error.required': 'Nie wypełniłeś wszystkich wymaganych pól poprawnie',
    'form.error.sending': 'Wystąpił problem z wysłaniem twojej odpowiedzi. Spróbuj ponownie później',
    'form.success': 'Wysłano pomyślnie!',
  },
  id: {
    'label.addtocalendar': 'Tambahkan ke Kalender',
    ical: 'File iCal',
    ...calendarNames,
    'modal.button.default': 'Klik saya',
    'modal.webview.ical.h': 'Buka browser Anda',
    'modal.webview.ical.text': 'Sayangnya, browser dalam aplikasi memiliki masalah dengan cara kami menghasilkan file kalender.',
    'modal.clipboard.text': 'Kami telah secara otomatis menyalin URL ajaib ke clipboard Anda.',
    'modal.webview.ical.steps': '<ol><li><strong>Buka peramban lain</strong> pada ponsel Anda, ...</li><li>Tempelkan konten clipboard dan pergi.</li></ol>',
    'modal.opensafari.ical.h': 'Buka Safari',
    'modal.opensafari.ical.text': 'Sayangnya, iOS memiliki beberapa masalah dalam membuat dan membuka file kalender di luar Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Buka Safari</strong>, ...</li><li>Tempelkan konten clipboard dan pergi.</li></ol>',
    'modal.multidate.h': 'Ini adalah rangkaian acara',
    'modal.multidate.text': 'Tambahkan masing-masing bagian satu per satu:',
    'date.status.cancelled': 'Tanggal ini dibatalkan.',
    'date.status.cancelled.cta': 'Perbarui kalender Anda!',
    'modal.subscribe.yahoo.h': 'Tambahkan kalender ke Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Buka kalender Yahoo.</li><li>Klik pada tab "Tindakan".</li><li>Pilih "Ikuti Kalender Lain".</li><li>Pilih nama dan tempelkan URL dari clipboard Anda ke bidang URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Buka kalender Yahoo',
    close: 'Tutup',
    continue: 'Lanjutkan',
    cancel: 'Batal',
    expired: 'Kedaluwarsa',
    recurring: 'Berulang',
    thankyou: 'Terima kasih',
    submit: 'Kirim',
    'label.share.email': 'Bagikan via email',
    'label.share.copy': 'Salin tautan',
    'label.share.copied': 'Tersalin',
    'label.share.email.subject': 'Ingat tanggal ini',
    'form.error.required': 'Kamu belum mengisi semua kolom yang diperlukan dengan benar',
    'form.error.sending': 'Ada masalah saat mengirim jawabanmu. Coba lagi nanti',
    'form.success': 'Berhasil terkirim!',
  },
  no: {
    'label.addtocalendar': 'Legg til i kalenderen',
    ical: 'iCal-fil',
    ...calendarNames,
    'modal.button.default': 'Klikk på meg',
    'modal.webview.ical.h': 'Åpne nettleseren din',
    'modal.webview.ical.text': 'Dessverre har nettlesere i appen problemer med måten vi genererer kalenderfilen på.',
    'modal.clipboard.text': 'Vi kopierte automatisk en magisk URL til utklippstavlen din.',
    'modal.webview.ical.steps': '<ol><li><strong>Åpne en annen nettleser</strong> på telefonen, ...</li><li><strong>Lim inn</strong> innholdet på utklippstavlen og gå.</li></ol>',
    'modal.opensafari.ical.h': 'Åpne Safari',
    'modal.opensafari.ical.text': 'Dessverre har iOS noen problemer med å generere og åpne kalenderfilen utenfor Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Åpne Safari</strong>, ...</li><li><strong>Lim inn</strong> innholdet på utklippstavlen og gå.</li></ol>',
    'modal.multidate.h': 'Dette er en avtaleserie',
    'modal.multidate.text': 'Legg til de enkelte datoene i kalenderen din i rekkefølge:',
    'date.status.cancelled': 'Denne datoen ble avlyst.',
    'date.status.cancelled.cta': 'Oppdater kalenderen din!',
    'modal.subscribe.yahoo.h': 'Legg til kalender til Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Åpne Yahoo-kalenderen.</li><li>Klikk på «Handlinger»-fanen.</li><li>Velg «Følg andre kalendere».</li><li>Velg et navn og lim inn URL-en fra utklippstavlen i URL-feltet.</li></ol>',
    'modal.subscribe.yahoo.button': 'Åpne Yahoo-kalenderen',
    close: 'Lukk',
    continue: 'Fortsette',
    cancel: 'Avbryt',
    expired: 'Utløpt',
    recurring: 'Tilbakevendende',
    thankyou: 'Takk',
    submit: 'Send inn',
    'label.share.email': 'Del via e-post',
    'label.share.copy': 'Kopier lenke',
    'label.share.copied': 'Kopiert',
    'label.share.email.subject': 'Husk denne datoen',
    'form.error.required': 'Du har ikke fylt ut alle de nødvendige feltene riktig',
    'form.error.sending': 'Det oppsto et problem med å sende svaret ditt. Vennligst prøv igjen senere',
    'form.success': 'Sendt suksessfullt!',
  },
  fi: {
    'label.addtocalendar': 'Lisää kalenteriin',
    ical: 'iCal-tiedosto',
    ...calendarNames,
    'modal.button.default': 'Klikkaa minua',
    'modal.webview.ical.h': 'Avaa selain',
    'modal.webview.ical.text': 'Valitettavasti sovelluksen sisäisillä selaimilla on ongelmia kalenteritiedoston luomisessa.',
    'modal.clipboard.text': 'Olemme automaattisesti kopioineet maagisen URL-osoitteen leikepöydällesi.',
    'modal.webview.ical.steps': '<ol><li><strong>Avaa toinen selain</strong> puhelimessasi., ...</li><li><strong>liitä</strong> leikepöydän sisältö ja lähde.</li></ol>',
    'modal.opensafari.ical.h': 'Avaa Safari',
    'modal.opensafari.ical.text': 'Valitettavasti iOS:llä on ongelmia kalenteritiedoston luomisessa ja avaamisessa Safarin ulkopuolella.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Avaa Safari</strong>, ...</li><li><strong>liitä</strong> leikepöydän sisältö ja lähde.</li></ol>',
    'modal.multidate.h': 'Tämä on tapahtumasarja',
    'modal.multidate.text': 'Lisää yksittäiset osat yksi kerrallaan:',
    'date.status.cancelled': 'Tämä päivämäärä peruttiin.',
    'date.status.cancelled.cta': 'Päivitä kalenterisi!',
    'modal.subscribe.yahoo.h': 'Lisää kalenteri Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Avaa Yahoo-kalenteri.</li><li>Napsauta "Toiminnot"-välilehteä.</li><li>Valitse "Seuraa muiden kalentereita".</li><li>Valitse nimi ja liitä URL-osoite leikepöydältäsi URL-kenttään.</li></ol>',
    'modal.subscribe.yahoo.button': 'Avaa Yahoo-kalenteri',
    close: 'Sulje',
    continue: 'Jatkaa',
    cancel: 'Peruuta',
    expired: 'Vanhentunut',
    recurring: 'Toistuva',
    thankyou: 'Kiitos',
    submit: 'Lähetä',
    'label.share.email': 'Jaa sähköpostitse',
    'label.share.copy': 'Kopioi linkki',
    'label.share.copied': 'Kopioitu',
    'label.share.email.subject': 'Muista tämä päivämäärä',
    'form.error.required': 'Et täyttänyt kaikkia vaadittuja kenttiä oikein',
    'form.error.sending': 'Vastauksen lähettämisessä ilmeni ongelma. Yritä myöhemmin uudelleen',
    'form.success': 'Lähetetty onnistuneesti!',
  },
  sv: {
    'label.addtocalendar': 'Lägg till i kalender',
    ical: 'iCal-fil',
    ...calendarNames,
    'modal.button.default': 'Klicka på mig',
    'modal.webview.ical.h': 'Öppna din webbläsare',
    'modal.webview.ical.text': 'Tyvärr har webbläsare i appen problem med hur vi genererar kalenderfilen.',
    'modal.clipboard.text': 'Vi har automatiskt kopierat en magisk URL till ditt klippblock.',
    'modal.webview.ical.steps': '<ol><li><strong>Öppna en annan webbläsare</strong> på telefonen, ...</li><li><strong>Insätt</strong> innehållet i klippbordet och kör.</li></ol>',
    'modal.opensafari.ical.h': 'Öppna Safari',
    'modal.opensafari.ical.text': 'Tyvärr har iOS vissa problem med att generera och öppna kalenderfilen utanför Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Öppna Safari</strong>, ...</li><li><strong>Insätt</strong> innehållet i klippbordet och kör.</li></ol>',
    'modal.multidate.h': 'Detta är en evenemangsserie',
    'modal.multidate.text': 'Lägg till de enskilda delarna en efter en:',
    'date.status.cancelled': 'Detta datum har ställts in.',
    'date.status.cancelled.cta': 'Uppdatera din kalender!',
    'modal.subscribe.yahoo.h': 'Lägg till kalender i Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Öppna Yahoo-kalendern.</li><li>Klicka på fliken "Åtgärder".</li><li>Välj "Följ andra kalendrar".</li><li>Välj ett namn och klistra in URL:en från klippbordet i URL-fältet.</li></ol>',
    'modal.subscribe.yahoo.button': 'Öppna Yahoo-kalendern',
    close: 'Stäng',
    continue: 'Fortsätta',
    cancel: 'Avbryt',
    expired: 'Utgånget',
    recurring: 'Återkommande',
    thankyou: 'Tack',
    submit: 'Skicka',
    'label.share.email': 'Dela via e-post',
    'label.share.copy': 'Kopiera länk',
    'label.share.copied': 'Kopierat',
    'label.share.email.subject': 'Kom ihåg detta datum',
    'form.error.required': 'Du har inte fyllt i alla nödvändiga fält korrekt',
    'form.error.sending': 'Det uppstod ett problem när ditt svar skickades. Försök igen senare',
    'form.success': 'Skickat framgångsrikt!',
  },
  cs: {
    'label.addtocalendar': 'Přidat do kalendáře',
    ical: 'Soubor iCal',
    ...calendarNames,
    'modal.button.default': 'Klikněte na mě',
    'modal.webview.ical.h': 'Otevřete prohlížeč',
    'modal.webview.ical.text': 'Prohlížeče v aplikacích mají bohužel problémy se způsobem generování souboru kalendáře.',
    'modal.clipboard.text': 'Do schránky jsme automaticky zkopírovali kouzelnou adresu URL.',
    'modal.webview.ical.steps': '<ol><li><strong>Otevření jiného prohlížeče</strong> v telefonu, ...</li><li><strong>Vložte</strong> obsah schránky a přejděte.</li></ol>',
    'modal.opensafari.ical.h': 'Otevřít Safari',
    'modal.opensafari.ical.text': 'Bohužel má iOS nějaké problémy s generováním a otevíráním souboru kalendáře mimo Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Otevřít Safari</strong>, ...</li><li><strong>Vložte</strong> obsah schránky a přejděte.</li></ol>',
    'modal.multidate.h': 'Jedná se o sérii událostí',
    'modal.multidate.text': 'Přidávejte jednotlivé díly jeden po druhém:',
    'date.status.cancelled': 'Toto datum bylo zrušeno.',
    'date.status.cancelled.cta': 'Aktualizujte svůj kalendář!',
    'modal.subscribe.yahoo.h': 'Přidat kalendář do Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Otevřete kalendář Yahoo.</li><li>Klikněte na kartu "Akce".</li><li>Vyberte možnost "Sledovat další kalendáře".</li><li>Vyberte název a vložte adresu URL ze schránky do pole URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Otevřete kalendář Yahoo',
    close: 'Zavřít',
    continue: 'Pokračovat',
    cancel: 'Storno',
    expired: 'Platnost vypršela',
    recurring: 'Opakující se',
    thankyou: 'Děkuji',
    submit: 'Odeslat',
    'label.share.email': 'Sdílet e-mailem',
    'label.share.copy': 'Kopírovat odkaz',
    'label.share.copied': 'Zkopírováno',
    'label.share.email.subject': 'Zapamatuj si tento termín',
    'form.error.required': 'Nevyplnil jsi správně všechna požadovaná pole',
    'form.error.sending': 'Při odesílání tvé odpovědi došlo k problému. Zkus to prosím později znovu',
    'form.success': 'Úspěšně odesláno!',
  },
  ja: {
    'label.addtocalendar': 'カレンダーに追加',
    ical: 'iCalファイル',
    ...calendarNames,
    'modal.button.default': 'クリックしてください',
    'modal.webview.ical.h': 'ブラウザを起動する',
    'modal.webview.ical.text': '残念ながら、アプリ内ブラウザは、カレンダーファイルの生成方法に問題があります。',
    'modal.clipboard.text': '魔法のURLを自動的にクリップボードにコピーしています。',
    'modal.webview.ical.steps': '<ol><li>スマートフォンで別のブラウザを起動する, ...</li><li>クリップボードの内容を貼り付けて行く。</li></ol>',
    'modal.opensafari.ical.h': 'オープンSafari',
    'modal.opensafari.ical.text': '残念ながら、iOS では、Safari の外でカレンダー ファイルを生成したり開いたりする際にいくつかの問題があります。',
    'modal.opensafari.ical.steps': '<ol><li><strong>オープンSafari</strong>, ...</li><li>クリップボードの内容を貼り付けて行く。</li></ol>',
    'modal.multidate.h': 'イベントシリーズです',
    'modal.multidate.text': '個々のパーツを一つずつ追加していく:',
    'date.status.cancelled': 'この日はキャンセルになりました。',
    'date.status.cancelled.cta': 'カレンダーを更新する!',
    'modal.subscribe.yahoo.h': 'Yahooにカレンダーを追加する',
    'modal.subscribe.yahoo.text': '<ol><li>Yahooカレンダーを開く。</li><li>[実行] タブをクリックします。</li><li>[その他のカレンダーのフォロー] を選択します。</li><li>名前を決めて、クリップボードにあるURLをURL欄に貼り付けます。</li></ol>',
    'modal.subscribe.yahoo.button': 'Yahooカレンダーを開く',
    close: '閉じる',
    continue: '続ける',
    cancel: 'キャンセル',
    expired: '期限切れ',
    recurring: '繰り返し',
    thankyou: 'ありがとう',
    submit: '送信',
    'label.share.email': 'メールで共有',
    'label.share.copy': 'リンクをコピー',
    'label.share.copied': 'コピー済み',
    'label.share.email.subject': 'この日付を覚えておいて',
    'form.error.required': '必要なフィールドをすべて正しく入力していません',
    'form.error.sending': 'あなたの回答を送信する際に問題が発生しました。後で再試行してください',
    'form.success': '正常に送信されました！',
  },
  it: {
    'label.addtocalendar': 'Aggiungi al calendario',
    ical: 'File iCal',
    ...calendarNames,
    'modal.button.default': 'Clicca su di me',
    'modal.webview.ical.h': 'Aprire il browser',
    'modal.webview.ical.text': 'Purtroppo i browser in-app hanno problemi con il modo in cui generiamo il file del calendario.',
    'modal.clipboard.text': 'Abbiamo copiato automaticamente un URL magico negli appunti.',
    'modal.webview.ical.steps': '<ol><li><strong>Aprire un altro browser</strong> sul cellulare, ...</li><li><strong>Incollare</strong> il contenuto degli appunti e partire.</li></ol>',
    'modal.opensafari.ical.h': 'Aprire Safari',
    'modal.opensafari.ical.text': "Sfortunatamente, iOS ha alcuni problemi nella generazione e nell'apertura del file del calendario al di fuori di Safari.",
    'modal.opensafari.ical.steps': '<ol><li><strong>Aprire Safari</strong>, ...</li><li><strong>Incollare</strong> il contenuto degli appunti e partire.</li></ol>',
    'modal.multidate.h': 'Questa è una serie di eventi',
    'modal.multidate.text': 'Aggiungere le singole parti una per una:',
    'date.status.cancelled': 'La data è stata annullata.',
    'date.status.cancelled.cta': 'Aggiornare il calendario!',
    'modal.subscribe.yahoo.h': 'Aggiungi il calendario a Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Aprire il calendario di Yahoo.</li><li>Fare clic sulla scheda "Azioni".</li><li>Selezionare "Segui altri calendari".</li><li>Scegliere un nome e incollare l\'URL dagli appunti nel campo URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Apri il calendario di Yahoo',
    close: 'Chiudere',
    continue: 'Continuare',
    cancel: 'Annulla',
    expired: 'Scaduta',
    recurring: 'Ricorrente',
    thankyou: 'Grazie',
    submit: 'Invia',
    'label.share.email': 'Condividi via Email',
    'label.share.copy': 'Copia il link',
    'label.share.copied': 'Copiato',
    'label.share.email.subject': 'Ricorda questa data',
    'form.error.required': 'Non hai compilato correttamente tutti i campi richiesti',
    'form.error.sending': "C'è stato un problema nell'invio della tua risposta. Prova di nuovo più tardi",
    'form.success': 'Inviato con successo!',
  },
  ko: {
    'label.addtocalendar': '캘린더에 추가',
    ical: 'iCal 파일',
    ...calendarNames,
    'modal.button.default': '클릭 해주세요',
    'modal.webview.ical.h': '브라우저 열기',
    'modal.webview.ical.text': '불행히도 인앱 브라우저는 캘린더 파일을 생성하는 방식에 문제가 있습니다.',
    'modal.clipboard.text': '매직 URL을 클립보드에 자동으로 복사했습니다.',
    'modal.webview.ical.steps': '<ol><li>휴대전화에서 다른 브라우저 열기, ...</li><li>클립보드 내용을 붙여넣고 이동합니다.</li></ol>',
    'modal.opensafari.ical.h': 'Safari 열기',
    'modal.opensafari.ical.text': '안타깝게도 iOS에는 Safari 외부에서 캘린더 파일을 생성하고 여는 데 몇 가지 문제가 있습니다.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Safari 열기</strong>, ...</li><li>클립보드 내용을 붙여넣고 이동합니다.</li></ol>',
    'modal.multidate.h': '이벤트 시리즈입니다',
    'modal.multidate.text': '개별 부품을 하나씩 추가:',
    'date.status.cancelled': '이 날짜는 취소되었습니다.',
    'date.status.cancelled.cta': '캘린더를 업데이트하세요!',
    'modal.subscribe.yahoo.h': 'Yahoo에 캘린더 추가',
    'modal.subscribe.yahoo.text': '<ol><li>Yahoo 캘린더를 엽니다.</li><li>"동작" 탭을 클릭합니다.</li><li>"다른 일정관리 팔로우"를 선택합니다.</li><li>이름을 선택하고 클립보드의 URL을 URL 필드에 붙여넣습니다.</li></ol>',
    'modal.subscribe.yahoo.button': '야후 캘린더 열기',
    close: '닫다',
    continue: '계속하다',
    cancel: '취소',
    expired: '만료됨',
    recurring: '되풀이',
    thankyou: '감사합니다',
    submit: '제출하기',
    'label.share.email': '이메일로 공유하기',
    'label.share.copy': '링크 복사하기',
    'label.share.copied': '복사됨',
    'label.share.email.subject': '이 날짜를 기억하세요',
    'form.error.required': '필수 필드를 모두 올바르게 채우지 않았습니다',
    'form.error.sending': '응답을 보내는 데 문제가 발생했습니다. 나중에 다시 시도해주세요',
    'form.success': '성공적으로 전송됨!',
  },
  vi: {
    'label.addtocalendar': 'Thêm vào Lịch',
    ical: 'Tệp iCal',
    ...calendarNames,
    'modal.button.default': 'Nhấp vào đây',
    'modal.webview.ical.h': 'Mở trình duyệt của bạn',
    'modal.webview.ical.text': 'Rất tiếc, các trình duyệt trong ứng dụng gặp sự cố với cách chúng tôi tạo tệp lịch.',
    'modal.clipboard.text': 'Chúng tôi đã tự động sao chép một URL ma thuật vào khay nhớ tạm của bạn.',
    'modal.webview.ical.steps': '<ol><li><strong> Mở trình duyệt khác </strong> trên điện thoại của bạn, ...</li><li><strong> Dán </strong> nội dung khay nhớ tạm và bắt đầu.</li></ol>',
    'modal.opensafari.ical.h': 'Mở Safari',
    'modal.opensafari.ical.text': 'Rất tiếc, iOS gặp một số sự cố khi tạo và mở tệp lịch bên ngoài Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Mở Safari</strong>, ...</li><li><strong> Dán </strong> nội dung khay nhớ tạm và bắt đầu.</li></ol>',
    'modal.multidate.h': 'Đây là một chuỗi sự kiện',
    'modal.multidate.text': 'Thêm từng phần riêng lẻ một:',
    'date.status.cancelled': 'Ngày này đã bị hủy.',
    'date.status.cancelled.cta': 'Cập nhật lịch của bạn!',
    'modal.subscribe.yahoo.h': 'Thêm lịch vào Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Mở Lịch Yahoo.</li><li>Nhấp vào tab "Hành động".</li><li>Chọn "Theo dõi các Lịch khác".</li><li>Chọn tên và dán URL từ khay nhớ tạm của bạn vào trường URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Mở lịch Yahoo',
    close: 'Đóng',
    continue: 'Tiếp tục',
    cancel: 'Hủy bỏ',
    expired: 'Hết hạn',
    recurring: 'Định kỳ',
    thankyou: 'Cảm ơn',
    submit: 'Gửi',
    'label.share.email': 'Chia sẻ qua Email',
    'label.share.copy': 'Sao chép liên kết',
    'label.share.copied': 'Đã sao chép',
    'label.share.email.subject': 'Ghi nhớ ngày này',
    'form.error.required': 'Bạn chưa điền đúng tất cả các trường bắt buộc',
    'form.error.sending': 'Có sự cố khi gửi phản hồi của bạn. Vui lòng thử lại sau',
    'form.success': 'Gửi thành công!',
  },
  ro: {
    'label.addtocalendar': 'Adauga In Calendar',
    ical: 'Fisier iCal',
    ...calendarNames,
    'modal.button.default': 'Apasa-ma',
    'modal.webview.ical.h': 'Deschide browserul',
    'modal.webview.ical.text': 'Din pacate, browserele din aplicatie au probleme cu generarea de fisiere pentru calendar.',
    'modal.clipboard.text': 'Ti-am copiat automat un URL magic in clipboard',
    'modal.webview.ical.steps': '<ol><li><strong>Deschide un alt browser</strong> pe telefonul tau, ...</li><li><strong>Lipeste</strong> continutul din clipboard si continua.</li></ol>',
    'modal.opensafari.ical.h': 'Deschide Safari',
    'modal.opensafari.ical.text': 'Din păcate, iOS are unele probleme la generarea și deschiderea fișierului calendar în afara Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Deschides Safari</strong>, ...</li><li><strong>Lipeste</strong> continutul din clipboard si continua.</li></ol>',
    'modal.multidate.h': 'Aceasta este o serie de evenimente',
    'modal.multidate.text': 'Adauga evenimentele individuale una cate una:',
    'date.status.cancelled': 'Aceasta data a fost anulata.',
    'date.status.cancelled.cta': 'Te rugam sa-ti updatezi calendarul!',
    'modal.subscribe.yahoo.h': 'Adauga Calendar in Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Deschide acum calendarul Yahoo.</li><li>Apasa pe tab-ul de "Actiuni".</li><li>Apasa "Urmareste alte calendare".</li><li>Seteaza un nume si lipeste continutul din clipboard in casuta cu url.</li></ol>',
    'modal.subscribe.yahoo.button': 'Deschideți calendarul Yahoo',
    close: 'Inchide',
    continue: 'Continua',
    cancel: 'Anuleaza',
    expired: 'Expirat',
    recurring: 'Recurente',
    thankyou: 'Mulțumesc',
    submit: 'Trimite',
    'label.share.email': 'Distribuie prin e-mail',
    'label.share.copy': 'Copiază linkul',
    'label.share.copied': 'Copiat',
    'label.share.email.subject': 'Ține minte această dată',
    'form.error.required': 'Nu ai completat corect toate câmpurile necesare',
    'form.error.sending': 'A apărut o problemă la trimiterea răspunsului tău. Încearcă din nou mai târziu',
    'form.success': 'Trimis cu succes!',
  },
  fa: {
    'label.addtocalendar': 'افزودن به تقویم',
    ical: 'پرونده iCal',
    ...calendarNames,
    'modal.button.default': 'اینجا کلیک کنید',
    'modal.webview.ical.h': 'مرورگر خود را باز کنید',
    'modal.webview.ical.text': 'متاسفانه، مرورگرهای درون برنامه‌ای با نحوه تولید پرونده تقویم مشکل دارند.',
    'modal.clipboard.text': 'ما به طور خودکار یک نشانی اینترنتی جادویی را در کلیپ‌بورد شما کپی کردیم.',
    'modal.webview.ical.steps': '<ol><li><strong>مرورگر دیگری را </strong> در گوشی خود باز کنید، ...</li><li>محتوای کلیپ‌بورد را <strong>Paste</strong> کنید و Go را بزنید که آدرس باز شود.</li></ol>',
    'modal.opensafari.ical.h': 'سافاری را باز کنید',
    'modal.opensafari.ical.text': 'متأسفانه iOS در تولید و باز کردن فایل تقویم خارج از سافاری مشکلاتی دارد.',
    'modal.opensafari.ical.steps': '<ol><li><strong>سافاری را باز کنید</strong>، ...</li><li>محتوای کلیپ‌بورد را <strong>Paste</strong> کنید و Go را بزنید که آدرس باز شود.</li></ol>',
    'modal.multidate.h': 'این یک سری رویداد است',
    'modal.multidate.text': 'رویدادهای شخصی را یکی یکی اضافه کنید:',
    'date.status.cancelled': 'این تاریخ لغو شد',
    'date.status.cancelled.cta': 'لطفا تقویم خود را به‌روز کنید!',
    'modal.subscribe.yahoo.h': 'افزودن تقویم به یاهو',
    'modal.subscribe.yahoo.text': '<ol><li>اکنون تقویم یاهو را باز کنید.</li><li>روی زبانه «Actions» کلیک کنید.</li><li>روی «Follow Other Calendars» ضربه بزنید.</li><li>یک نام وارد کنید و محتوای کلیپ‌بورد را در قسمت url قرار دهید.</li></ol>',
    'modal.subscribe.yahoo.button': 'تقویم یاهو را باز کنید',
    close: 'بستن',
    continue: 'ادامه دادن',
    cancel: 'لغو',
    expired: 'منقضی شده',
    thankyou: 'ممنون',
    submit: 'ارسال',
    'label.share.email': 'اشتراک‌گذاری از طریق ایمیل',
    'label.share.copy': 'کپی لینک',
    'label.share.copied': 'کپی شد',
    'label.share.email.subject': 'این تاریخ را به یاد داشته باشید',
    'form.error.required': 'شما همه فیلدهای لازم را به درستی پر نکرده‌اید',
    'form.error.sending': 'مشکلی در ارسال پاسخ شما وجود داشت. لطفا بعدا دوباره تلاش کنید',
    'form.success': 'با موفقیت ارسال شد!',
  },
  et: {
    'label.addtocalendar': 'Lisa kalendrisse',
    ical: 'iCal fail',
    ...calendarNames,
    'modal.button.default': 'Kliki siia',
    'modal.webview.ical.h': 'Ava oma veebilehitseja',
    'modal.webview.ical.text': 'Kahjuks on rakendusesisestel veebilehitsejatel probleeme kalendrifailide loomisega.',
    'modal.clipboard.text': 'Kalendri veebi aadress on automaatselt kopeeritud sinu lõikelauale.',
    'modal.webview.ical.steps': '<ol><li><strong>Ava teine veebilehitseja</strong> oma telefonis, ...</li><li><strong>Kleebi</strong> lõikelaua sisu ning mine sellele lehele.</li></ol>',
    'modal.opensafari.ical.h': 'Ava Safari',
    'modal.opensafari.ical.text': 'Kahjuks on iOS-il probleeme kalendrifaili genereerimise ja avamisega väljaspool Safarit.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Ava Safari</strong>, ...</li><li><strong>Kleebi</strong> lõikelaua sisu ning mine sellele lehele.</li></ol>',
    'modal.multidate.h': 'See on sündmuste seeria',
    'modal.multidate.text': 'Ava üksikud sündmused ükshaaval:',
    'date.status.cancelled': 'See kuupäev on tühistatud.',
    'date.status.cancelled.cta': 'Palun uuenda oma kalendrit!',
    'modal.subscribe.yahoo.h': 'Lisa kalender Yahoo-sse',
    'modal.subscribe.yahoo.text': '<ol><li>Ava oma Yahoo kalender.</li><li>Kliki "Actions" vahelehte.</li><li>Vajuta "Follow Other Calendars".</li><li>Määra nimi ning lisa lõikelaua sisu URL (veebi aadressi) väljale.</li></ol>',
    'modal.subscribe.yahoo.button': 'Avage Yahoo kalender',
    close: 'Sulge',
    continue: 'Jätkama',
    cancel: 'Tühista',
    expired: 'Aegunud',
    thankyou: 'Aitäh',
    submit: 'Saada',
    'label.share.email': 'Jaga e-posti teel',
    'label.share.copy': 'Kopeeri link',
    'label.share.copied': 'Kopeeritud',
    'label.share.email.subject': 'Pane see kuupäev kirja',
    'form.error.required': 'Sa pole kõiki nõutavaid välju korrektselt täitnud',
    'form.error.sending': 'Sinu vastuse saatmisel tekkis probleem. Palun proovi hiljem uuesti',
    'form.success': 'Edukalt saadetud!',
  },
  uk: {
    'label.addtocalendar': 'Додати до календаря',
    ical: 'Файл iCal',
    ...calendarNames,
    'modal.button.default': 'Натисни мене',
    'modal.webview.ical.h': 'Відкрийте ваш браузер',
    'modal.webview.ical.text': 'На жаль, браузери у додатках мають проблеми з обробкою файлу календаря, який ми створюємо.',
    'modal.clipboard.text': 'Ми автоматично скопіювали магічний URL у ваш буфер обміну.',
    'modal.webview.ical.steps': '<ol><li><strong>Відкрийте інший браузер</strong> на своєму телефоні, ...</li><li><strong>Вставте</strong> скопійований вміст і перейдіть.</li></ol>',
    'modal.opensafari.ical.h': 'Відкрити Safari',
    'modal.opensafari.ical.text': 'На жаль, iOS має проблеми з генерацією та відкриттям файлу календаря поза Safari.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Відкрийте Safari</strong>, ...</li><li><strong>Вставте</strong> скопійований вміст і перейдіть.</li></ol>',
    'modal.multidate.h': 'Це серія подій',
    'modal.multidate.text': 'Додайте окремі події по одній:',
    'date.status.cancelled': 'Цю дату скасовано.',
    'date.status.cancelled.cta': 'Оновіть свій календар, будь ласка!',
    'modal.subscribe.yahoo.h': 'Додати календар до Yahoo',
    'modal.subscribe.yahoo.text': '<ol><li>Відкрийте зараз календар Yahoo.</li><li>Натисніть вкладку «Дії».</li><li>Натисніть «Підписатися на інші календарі».</li><li>Введіть назву та вставте вміст буфера обміну в поле URL.</li></ol>',
    'modal.subscribe.yahoo.button': 'Відкрити Yahoo Календар',
    close: 'Закрити',
    continue: 'Продовжити',
    cancel: 'Скасувати',
    expired: 'Термін дії закінчився',
    recurring: 'Повторюваний',
    thankyou: 'Дякуємо',
    submit: 'Відправити',
    'label.rsvp': 'RSVP',
    'label.share.email': 'Поділитися через Email',
    'label.share.copy': 'Скопіювати посилання',
    'label.share.copied': 'Скопійовано',
    'label.share.email.subject': 'Збережіть цю подію',
    'form.error.required': "Ви не заповнили всі обов'язкові поля",
    'form.error.sending': 'Сталася проблема з відправленням вашої відповіді. Спробуйте ще раз пізніше.',
    'form.success': 'Успішно відправлено!',
  },
  hu: {
    'label.addtocalendar': 'Hozzáadás a naptárhoz',
    ical: 'iCal fájl',
    ...calendarNames,
    'modal.button.default': 'Kattints ide',
    'modal.webview.ical.h': 'Nyisd meg a böngészőt',
    'modal.webview.ical.text': 'Sajnos az alkalmazáson belüli böngészőknek problémái vannak a naptárfájl generálásával.',
    'modal.clipboard.text': 'Automatikusan átmásoltunk egy varázslatos URL-t a vágólapodra.',
    'modal.webview.ical.steps': '<ol><li><strong>Nyiss meg egy másik böngészőt</strong> a telefonodon, ...</li><li><strong>Illeszd be</strong> a vágólap tartalmát és menj.</li></ol>',
    'modal.opensafari.ical.h': 'Safari megnyitása',
    'modal.opensafari.ical.text': 'Sajnos az iOS-nek problémái vannak a naptárfájl generálásával és megnyitásával a Safarin kívül.',
    'modal.opensafari.ical.steps': '<ol><li><strong>Nyisd meg a Safarit</strong>, ...</li><li><strong>Illeszd be</strong> a vágólap tartalmát és menj.</li></ol>',
    'modal.multidate.h': 'Ez egy eseménysorozat',
    'modal.multidate.text': 'Add hozzá az egyes eseményeket egyenként:',
    'date.status.cancelled': 'Ez a dátum lemondásra került.',
    'date.status.cancelled.cta': 'Kérjük, frissítsd a naptáradat!',
    'modal.subscribe.yahoo.h': 'Naptár hozzáadása a Yahoo-hoz',
    'modal.subscribe.yahoo.text': '<ol><li>Nyisd meg a Yahoo Naptárt most.</li><li>Kattints a "Actions" fülre.</li><li>Válaszd a "Follow Other Calendars" opciót.</li><li>Adj meg egy nevet és illeszd be a vágólap tartalmát az URL mezőbe.</li></ol>',
    'modal.subscribe.yahoo.button': 'Yahoo Naptár megnyitása',
    close: 'Bezárás',
    continue: 'Folytatás',
    cancel: 'Mégse',
    expired: 'Lejárt',
    recurring: 'Ismétlődő',
    thankyou: 'Köszönjük',
    submit: 'Küldés',
    'label.rsvp': 'Válasz',
    'label.share.email': 'Megosztás e-mailben',
    'label.share.copy': 'Link másolása',
    'label.share.copied': 'Másolva',
    'label.share.email.subject': 'Mentsd el ezt az eseményt',
    'form.error.required': 'Nem töltöttél ki megfelelően minden kötelező mezőt',
    'form.error.sending': 'Hiba történt a válasz küldése során. Kérjük, próbáld újra később',
    'form.success': 'Sikeresen elküldve!',
  },
};
const availableLanguages = Object.keys(i18nStrings);
function atcb_translate_hook(identifier, data) {
  if (data.customLabels && data.customLabels[`${identifier}`] && data.customLabels[`${identifier}`] !== '') {
    return atcb_rewrite_html_elements(data.customLabels[`${identifier}`]);
  } else {
    return atcb_translate(identifier, data.language);
  }
}
function atcb_translate(identifier, language) {
  if (!language) {
    language = 'en';
  }
  if (i18nStrings[`${language}`][`${identifier}`]) {
    return i18nStrings[`${language}`][`${identifier}`];
  }
  if (language !== 'en') {
    return atcb_translate(identifier, 'en');
  }
  return identifier;
}


let atcbInitialGlobalInit = false;
let atcbBtnCount = 0;
const lightModeMutationObserver = [];
const template = `<div class="atcb-initialized atcb-hidden"></div>`;
if (atcbIsBrowser()) {
  class AddToCalendarButton extends HTMLElement {
    constructor() {
      super();
      this._initialized = new Promise((resolve) => (this._initializedResolver = resolve));
      const elem = document.createElement('template');
      elem.innerHTML = template;
      this.attachShadow({ mode: 'open', delegateFocus: true });
      this.shadowRoot.append(elem.content.cloneNode(true));
      this.state = {
        initializing: false,
        initialized: false,
        ready: false,
        updatePending: false,
      };
      this.data = {};
      this.error = false;
    }
    connectedCallback() {
      if (!this.initializing) {
        this.initializing = true;
        setTimeout(() => this.initializeComponent(), 0);
      }
    }
    async initializeComponent() {
      if (this.state.ready) {
        return;
      }
      this.state.initializing = true;
      const debugVal = this.getAttribute('debug');
      this.debug = this.hasAttribute('debug') && (!debugVal || debugVal === 'true' || debugVal === '') ? true : false;
      if (this.hasAttribute('proOverride') || this.hasAttribute('prooverride')) {
        let proOverrideVal = null;
        if (this.hasAttribute('proOverride') && this.getAttribute('proOverride') !== '') {
          proOverrideVal = this.getAttribute('proOverride');
        } else {
          proOverrideVal = this.getAttribute('prooverride');
        }
        this.proOverride = !proOverrideVal || proOverrideVal === 'true' || proOverrideVal === '' ? true : false;
      }
      try {
        if ((this.hasAttribute('proKey') && this.getAttribute('proKey') !== '') || (this.hasAttribute('prokey') && this.getAttribute('prokey') !== '')) {
          if (this.hasAttribute('proKey') && this.getAttribute('proKey') !== '') {
            this.data = await atcb_get_pro_data(this.getAttribute('proKey'), this);
          } else {
            this.data = await atcb_get_pro_data(this.getAttribute('prokey'), this);
          }
          if (this.data.proKey) this.proKey = this.data.proKey;
        } else {
          this.data.proKey = '';
          this.data = await atcb_process_inline_data(this, this.debug);
        }
      } catch (e) {
        if (this.debug) {
          console.error(e);
          atcb_render_debug_msg(this.shadowRoot, e);
        }
        this.state.initializing = false;
        this.state.ready = true;
        return;
      }
      await this.initButton();
      this.state.initializing = false;
      this.state.initialized = true;
      this.state.ready = true;
      this._initializedResolver();
      return;
    }
    whenInitialized() {
      return this._initialized;
    }
    disconnectedCallback() {
      atcb_cleanup(this.shadowRoot, this.identifier);
      if (this.debug) {
        console.log('Add to Calendar Button "' + this.identifier + '" destroyed');
      }
      if (document.querySelectorAll('add-to-calendar-button').length === 0) {
        atcbBtnCount = 0;
      }
    }
    static get observedAttributes() {
      const observeAdditionally = ['instance', 'prokey', 'proKey', 'prooverride', 'proOverride'];
      if (this.proKey && this.proKey !== '') {
        return atcbWcProParams
          .map((element) => {
            return element.toLowerCase();
          })
          .concat(observeAdditionally);
      }
      return atcbWcParams
        .map((element) => {
          return element.toLowerCase();
        })
        .concat(observeAdditionally);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (!this.state.ready) {
        return;
      }
      if (this.debug && this.state.initialized) {
        console.log(`${name}'s value has been changed from ${oldValue} to ${newValue}`);
      }
      if (!this.updatePending) {
        this.updatePending = true;
        setTimeout(() => this.updateComponent(), 0);
      }
    }
    async updateComponent() {
      if (!this.updatePending) return;
      this.data = {};
      this.shadowRoot.querySelector('.atcb-initialized').remove();
      const elem = document.createElement('template');
      elem.innerHTML = template;
      this.shadowRoot.append(elem.content.cloneNode(true));
      try {
        if (this.hasAttribute('proKey') && this.getAttribute('proKey') !== '') {
          this.data = await atcb_get_pro_data(this.getAttribute('proKey'), this);
          if (this.data.proKey) this.proKey = this.data.proKey;
        } else if (this.hasAttribute('prokey') && this.getAttribute('prokey') !== '') {
          this.data = await atcb_get_pro_data(this.getAttribute('prokey'), this);
          if (this.data.proKey) this.proKey = this.data.proKey;
        } else {
          this.data = await atcb_process_inline_data(this, this.debug);
        }
      } catch (e) {
        if (this.debug) {
          console.error(e);
          atcb_render_debug_msg(this.shadowRoot, e);
        }
        this.updatePending = false;
        return;
      }
      atcb_cleanup(this.shadowRoot, this.identifier);
      await this.initButton();
      this.updatePending = false;
    }
    async initButton() {
      if (!this.state.initialized) {
        atcbBtnCount = atcbBtnCount + 1;
      }
      if (this.identifier && this.identifier !== '') {
        this.data.identifier = this.identifier;
      } else {
        if (this.data.identifier && this.data.identifier !== '') {
          if (!/^[\w-]+$/.test(this.data.identifier)) {
            this.data.identifier = '';
            if (this.debug) {
              let prefix = 'Add to Calendar Button';
              if (this.data.rsvp && Object.keys(this.data.rsvp).length > 0) {
                prefix = 'RSVP';
              }
              console.warn(prefix + ' generation: identifier invalid - using auto numbers instead');
            }
          } else {
            this.data.identifier = 'atcb-btn-' + this.data.identifier;
          }
        }
        if (this.data.identifier == null || this.data.identifier == '') {
          this.data.identifier = 'atcb-btn-' + atcbBtnCount;
        }
        this.identifier = this.data.identifier;
      }
      this.setAttribute('atcb-button-id', this.data.identifier);
      try {
        this.style.visibility = 'visible';
        this.style.opacity = '1';
        this.style.position = 'relative';
        this.style.outline = 'none';
        await atcb_build_button(this.shadowRoot, this.data);
        return true;
      } catch (e) {
        if (this.debug) {
          console.error(e.message ? e.message : e);
          atcb_render_debug_msg(this.shadowRoot, e);
        }
        return false;
      }
    }
  }
  if (!customElements.get('add-to-calendar-button')) {
    customElements.define('add-to-calendar-button', AddToCalendarButton);
  }
}
async function atcb_process_inline_data(el, debug = false) {
  let data;
  try {
    data = atcb_read_attributes(el);
    await atcb_check_required(data);
  } catch {
    const slotInput = el.innerHTML.trim();
    if (!slotInput) {
      throw new Error('Add to Calendar Button generation failed: No data provided.');
    }
    try {
      const atcbJsonInput = JSON.parse(atcb_secure_content(slotInput.replace(/(\r\n|\n|\r)/g, ''), false));
      await atcb_check_required(atcbJsonInput);
      data = atcbJsonInput;
    } catch (jsonError) {
      if (debug) {
        console.error(jsonError);
      }
      throw new Error('Add to Calendar Button generation failed: no data provided or missing required fields - see console logs for details');
    }
  }
  return data;
}
function atcb_read_attributes(el, params = atcbWcParams) {
  let data = {};
  for (let i = 0; i < params.length; i++) {
    let attr = params[`${i}`];
    if (el.hasAttribute(`${attr}`)) {
      let inputVal = atcb_secure_content(el.getAttribute(`${attr}`).replace(/(\\r\\n|\\n|\\r)/g, ''), false);
      let val;
      if (atcbWcBooleanParams.includes(attr)) {
        val = !inputVal || inputVal === '' || inputVal.toLowerCase() === 'true' ? true : false;
      } else if (atcbWcObjectParams.includes(attr)) {
        const cleanedInput = (function () {
          if (!inputVal || inputVal === '') {
            return '{}';
          }
          if (inputVal.substring(0, 1) != '{') {
            return '{' + inputVal + '}';
          }
          return inputVal;
        })();
        val = JSON.parse(cleanedInput);
      } else if (atcbWcObjectArrayParams.includes(attr)) {
        const cleanedInput = (function () {
          if (!inputVal || inputVal === '') {
            return '[]';
          }
          if (inputVal.substring(0, 1) != '[') {
            return '[' + inputVal + ']';
          }
          return inputVal;
        })();
        val = JSON.parse(cleanedInput);
      } else if (atcbWcArrayParams.includes(attr)) {
        const cleanedInput = (function () {
          let newVal = inputVal;
          if (inputVal.includes('"') || inputVal.includes("'")) {
            if (inputVal.includes('[')) {
              newVal = inputVal.substring(2, inputVal.length - 2);
            } else {
              newVal = inputVal.substring(1, inputVal.length - 1);
            }
          }
          if (!inputVal.includes('|')) {
            newVal = newVal.replace(/\s/g, '');
          }
          return newVal;
        })();
        if (cleanedInput.includes("','")) {
          val = cleanedInput.split("','");
        } else {
          val = cleanedInput.split('","');
        }
      } else if (atcbWcNumberParams.includes(attr)) {
        val = parseInt(inputVal);
      } else {
        val = inputVal;
      }
      if ((typeof val === 'object' && Object.keys(val).length === 0) || (Array.isArray(val) && (val.length === 0 || (val.length === 1 && val[0] === '')))) {
        continue;
      }
      data[`${attr}`] = val;
    }
  }
  return data;
}
async function atcb_build_button(host, data) {
  try {
    host.host.classList.add('add-to-calendar');
    data = await atcb_decorate_data(data);
    await atcb_validate(data);
    const rootObj = host.querySelector('.atcb-initialized');
    atcb_set_light_mode(host, data);
    rootObj.setAttribute('lang', data.language);
    atcb_load_css(host, rootObj, data);
    atcb_setup_state_management(data);
    atcb_set_global_event_listener(host, data);
    atcb_init_log(data.proKey, data.hideBranding, data.debug);
    if (!data.hidden) {
      if (typeof atcb_generate_rsvp_form === 'function' && data.rsvp && Object.keys(data.rsvp).length > 0) {
        if (!data.inlineRsvp) {
          await atcb_generate_rsvp_button(host, data);
        } else {
          await atcb_generate_rsvp_form(host, data, rootObj);
        }
      } else {
        atcb_generate_button(host, rootObj, data);
      }
      if (!data.hideRichData && !data.subscribe && data.name && data.dates[0].location && data.dates[0].startDate) {
        atcb_generate_rich_data(data, host.host);
      }
    }
    atcb_log_event('initialization', data.identifier, data.identifier);
    if (!data.proKey && data.hideBranding && !document.getElementById('atcb-reference')) {
      atcb_create_atcbl(document.body, false, false, true);
    }
    return true;
  } catch (e) {
    throw new Error(e.message);
  }
}
function atcb_cleanup(host, identifier) {
  atcb_close(host);
  atcb_unset_global_event_listener(identifier);
  const schemaEl = document.getElementById('atcb-schema-' + identifier);
  if (schemaEl) {
    schemaEl.remove();
  }
  Array.from(host.querySelectorAll('.atcb-debug-error-msg'))
    .concat(Array.from(host.querySelectorAll('style')))
    .concat(Array.from(host.querySelectorAll('link')))
    .concat(Array.from(host.querySelectorAll('.atcb-placeholder')))
    .concat(Array.from(host.querySelectorAll('.atcb-button-wrapper')))
    .forEach((el) => el.remove());
  delete atcbStates[`${identifier}`];
}
function atcb_set_light_mode(shadowRoot, data) {
  shadowRoot.host.classList.remove('atcb-dark', 'atcb-light', 'atcb-bodyScheme');
  const hostLightMode = (function () {
    if (data.lightMode == 'bodyScheme') {
      if (
        document.body.classList.contains('atcb-dark') ||
        document.documentElement.classList.contains('atcb-dark') ||
        document.body.classList.contains('atcp-dark') ||
        document.documentElement.classList.contains('atcp-dark') ||
        document.body.classList.contains('dark') ||
        document.documentElement.classList.contains('dark')
      ) {
        return 'dark';
      } else {
        return 'light';
      }
    }
    return data.lightMode;
  })();
  shadowRoot.host.classList.add('atcb-' + hostLightMode);
}
function atcb_csp_nonce(host) {
  const cspnonceRegex = /[`'"()[\]{}<>\s]/;
  if (!host.host.hasAttribute('cspnonce')) {
    return null;
  }
  if (cspnonceRegex.test(host.host.getAttribute('cspnonce'))) {
    throw new Error('cspnonce input contains forbidden characters.');
  }
  return host.host.getAttribute('cspnonce');
}
async function atcb_load_css(host, rootObj = null, data) {
  const nonceVal = atcb_csp_nonce(host);
  if (!document.getElementById('atcb-global-style')) {
    const cssGlobalContent = document.createElement('style');
    cssGlobalContent.id = 'atcb-global-style';
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    cssGlobalContent.innerText = '.atcb-modal-no-scroll{overflow-y:hidden !important;-webkit-overflow-scrolling:touch;} body.atcb-modal-no-scroll{padding-right:' + scrollBarWidth + 'px;}.atcb-attribution{display:none;}';
    if (nonceVal) {
      cssGlobalContent.setAttribute('nonce', nonceVal);
    }
    document.head.append(cssGlobalContent);
  }
  const generalCssContent = document.createElement('style');
  const initWidth = data.inlineRsvp && data.rsvp && Object.keys(data.rsvp).length > 0 ? '100%' : 'fit-content';
  generalCssContent.innerText = `.atcb-initialized { display: block; position: relative; width: ${initWidth}; }.atcb-initialized.atcb-inline { display: inline-block; }.atcb-initialized.atcb-buttons-list { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--buttonslist-gap); }.atcb-hidden { display: none; }`;
  if (nonceVal) {
    generalCssContent.setAttribute('nonce', nonceVal);
  }
  host.prepend(generalCssContent);
  const overrideDefaultCss = (function () {
    if (data.styleLight) {
      return ':host{' + atcb_secure_content(data.styleLight.replace(/(\\r\\n|\\n|\\r)/g, ''), false) + '}';
    }
    return '';
  })();
  const overrideDarkCss = (function () {
    if (data.styleDark) {
      return ':host(.atcb-dark){' + atcb_secure_content(data.styleDark.replace(/(\\r\\n|\\n|\\r)/g, ''), false) + '}';
    }
    return '';
  })();
  if (data.customCss && data.customCss !== '') {
    const cssFile = document.createElement('link');
    cssFile.setAttribute('rel', 'stylesheet');
    cssFile.setAttribute('type', 'text/css');
    cssFile.setAttribute('href', data.customCss);
    if (nonceVal) {
      cssFile.setAttribute('nonce', nonceVal);
    }
    if (!rootObj) {
      await loadExternalCssAsynch(cssFile, host, null, nonceVal, null, false, false, overrideDefaultCss + overrideDarkCss);
    } else {
      const placeholder = document.createElement('div');
      placeholder.classList.add('atcb-placeholder');
      host.prepend(placeholder);
      const placeholderCssContent = document.createElement('style');
      placeholderCssContent.innerText = '.atcb-placeholder { background-color: #777; border-radius: 200px; height: 40px; opacity: .3; width: 150px; }';
      if (nonceVal) {
        placeholderCssContent.setAttribute('nonce', nonceVal);
      }
      host.prepend(placeholderCssContent);
      loadExternalCssAsynch(cssFile, host, rootObj, nonceVal, placeholder, data.inline, data.buttonsList, overrideDefaultCss + overrideDarkCss);
    }
    return;
  }
  if (data.buttonStyle !== 'none' && atcbCssTemplate[`${data.buttonStyle}`]) {
    const cssContent = document.createElement('style');
    if (nonceVal) {
      cssContent.setAttribute('nonce', nonceVal);
    }
    cssContent.innerText = atcbCssTemplate[`${data.buttonStyle}`] + overrideDefaultCss + overrideDarkCss;
    host.prepend(cssContent);
  }
  if (rootObj) {
    if (data.inline) {
      rootObj.style.display = 'inline-block';
      rootObj.classList.add('atcb-inline');
    } else {
      if (data.buttonsList) {
        rootObj.classList.add('atcb-buttons-list');
      }
    }
    rootObj.classList.remove('atcb-hidden');
  }
}
async function loadExternalCssAsynch(cssFile, host, rootObj = null, nonceVal = null, placeholder = null, inline = false, buttonsList = false, overrideCss = '') {
  if (overrideCss !== '') {
    const cssContent = document.createElement('style');
    cssContent.innerText = overrideCss;
    if (nonceVal) {
      cssContent.setAttribute('nonce', nonceVal);
    }
    host.prepend(cssContent);
  }
  try {
    host.prepend(cssFile);
    await new Promise((resolve) => {
      cssFile.onload = resolve;
    });
    if (rootObj) {
      if (placeholder) {
        placeholder.remove();
      }
      if (inline) {
        rootObj.style.display = 'inline-block';
        rootObj.classList.add('atcb-inline');
      } else {
        if (buttonsList) {
          rootObj.classList.add('atcb-buttons-list');
        }
      }
      rootObj.classList.remove('atcb-hidden');
    }
  } catch (e) {
    console.log(e);
  }
}
function atcb_render_debug_msg(host, error) {
  if (host.querySelector('.atcb-debug-error-msg')) return;
  const nonceVal = atcb_csp_nonce(host);
  const errorBanner = document.createElement('div');
  errorBanner.classList.add('atcb-debug-error-msg');
  const cssContent = document.createElement('style');
  cssContent.innerText = '.atcb-debug-error-msg { color: #bf2e2e; font-size: 12px; font-weight: bold; padding: 12px 15px; border: 2px solid #bf2e2e; max-width: 180px; border-radius: 13px; }';
  if (nonceVal) {
    cssContent.setAttribute('nonce', nonceVal);
  }
  host.prepend(cssContent);
  errorBanner.textContent = error;
  host.append(errorBanner);
}
async function atcb_action(inputData, triggerElement, keyboardTrigger = false) {
  if (!atcbIsBrowser()) {
    return;
  }
  let data;
  try {
    data = await (async function () {
      const cleanedInput = atcb_secure_content(inputData);
      if (cleanedInput.prokey && cleanedInput.prokey !== '') {
        cleanedInput.proKey = cleanedInput.prokey;
      }
      if (cleanedInput.proKey && cleanedInput.proKey !== '') {
        try {
          const proData = await atcb_get_pro_data(cleanedInput.proKey, null, cleanedInput);
          return proData;
        } catch (e) {
          throw new Error(e.message);
        }
      } else {
        return cleanedInput;
      }
    })();
  } catch (e) {
    console.error(e);
    return;
  }
  data.debug = data.debug === 'true';
  try {
    await atcb_check_required(data);
  } catch (e) {
    if (data.debug) {
      console.error(e);
    }
    throw new Error('Add to Calendar Button generation failed: no data provided or missing required fields - see console logs for details');
  }
  data = await atcb_decorate_data(data);
  let root = document.body;
  data.trigger = 'click';
  if (triggerElement) {
    root = triggerElement;
    if (triggerElement.id && triggerElement.id !== '') {
      data.identifier = triggerElement.id;
    } else {
      if (data.identifier && data.identifier != '' && /^[\w-]+$/.test(data.identifier)) {
        data.identifier = 'atcb-btn-' + data.identifier;
      } else {
        data.identifier = 'atcb-btn-custom';
      }
      triggerElement.id = data.identifier;
    }
    if (data.listStyle === 'dropdown' || data.listStyle === 'dropdown-static' || data.listStyle === 'dropup-static') {
      data.listStyle = 'modal';
    }
  } else {
    data.identifier = 'atcb-btn-custom';
    data.listStyle = 'modal';
  }
  try {
    await atcb_validate(data);
  } catch (e) {
    console.error(e);
    return false;
  }
  const oneOption = (function () {
    if (data.options.length === 1) {
      return true;
    }
    return false;
  })();
  const potentialExistingHost = document.getElementById('atcb-customTrigger-' + data.identifier + '-host');
  if (potentialExistingHost) {
    atcb_close(potentialExistingHost.shadowRoot, false);
    if (atcbStates[`${atcbStates['active']}`]) {
      delete atcbStates[`${atcbStates['active']}`];
    }
    potentialExistingHost.remove();
  }
  atcb_log_event('initialization', data.identifier, data.identifier);
  if (!data.blockInteraction && !data.hidden) {
    const host = document.createElement('div');
    if (data.cspnonce && data.cspnonce !== '') {
      host.setAttribute('cspnonce', data.cspnonce);
    }
    host.id = 'atcb-customTrigger-' + data.identifier + '-host';
    if (root === document.body) {
      document.body.append(host);
    } else {
      root.after(host);
    }
    if (triggerElement) {
      const btnDim = triggerElement.getBoundingClientRect();
      host.style.position = 'relative';
      host.style.left = -btnDim.width + 'px';
      host.style.top = btnDim.height + 'px';
    }
    host.setAttribute('atcb-button-id', data.identifier);
    host.attachShadow({ mode: 'open', delegateFocus: true });
    const elem = document.createElement('template');
    elem.innerHTML = template;
    host.shadowRoot.append(elem.content.cloneNode(true));
    const rootObj = host.shadowRoot.querySelector('.atcb-initialized');
    atcb_setup_state_management(data);
    atcb_set_light_mode(host.shadowRoot, data);
    host.shadowRoot.querySelector('.atcb-initialized').setAttribute('lang', data.language);
    atcb_load_css(host.shadowRoot, rootObj, data);
    atcb_set_global_event_listener(host.shadowRoot, data);
    if (typeof atcb_generate_rsvp_form === 'function' && data.rsvp && Object.keys(data.rsvp).length > 0) {
      atcb_generate_rsvp_form(host.shadowRoot, data, triggerElement, keyboardTrigger);
    } else {
      if (oneOption) {
        atcb_generate_links(host.shadowRoot, data.options[0], data, 'all', keyboardTrigger);
        atcb_log_event('openSingletonLink', data.identifier, data.identifier);
      } else {
        atcb_toggle(host.shadowRoot, 'open', data, triggerElement, keyboardTrigger);
      }
    }
  }
  atcb_init_log(data.proKey, data.hideBranding, data.debug);
  if (data.debug) {
    console.log('Add to Calendar Button "' + data.identifier + '" triggered');
  }
  return data.identifier;
}
function atcb_setup_state_management(data) {
  const singleDates = [];
  for (let i = 0; i < data.options.length; i++) {
    singleDates[data.options[`${i}`]] = [];
    for (let id = 1; id <= data.dates.length; id++) {
      if (data.dates[id - 1].status.toLowerCase() === 'cancelled') {
        singleDates[data.options[`${i}`]].push(1);
      } else {
        singleDates[data.options[`${i}`]].push(0);
      }
    }
  }
  atcbStates[data.identifier] = singleDates;
}
function atcb_init_log(pro = '', hide = false, debug = false) {
  if (!atcbInitialGlobalInit) {
    const versionOutput = (function () {
      if (debug) {
        return ' (version ' + atcbVersion + ')';
      }
      return '';
    })();
    if (pro !== '') {
      if (!hide || debug) console.log('Add to Calendar PRO script initialized' + versionOutput + ' | https://add-to-calendar-pro.com');
    } else {
      console.log('%c\nAdd to Calendar Button script initialized' + versionOutput + '\n' + 'see https://add-to-calendar-button.com for details.\n', 'font-weight: bold;');
      console.log('✨ %cPRO version available at https://add-to-calendar-pro.com ← check it out!', 'font-weight: bold; line-height: 60px;');
    }
    atcbInitialGlobalInit = true;
  }
}
async function atcb_get_pro_data(licenseKey, el = null, directData = {}) {
  /*!
   *  @preserve
   *  PER LICENSE AGREEMENT, YOU ARE NOT ALLOWED TO REMOVE OR CHANGE THIS FUNCTION!
   */
  if (licenseKey && licenseKey !== '') {
    try {
      const proOverride = el ? el.proOverride : directData.proOverride;
      const dataOverrides = el ? atcb_read_attributes(el, proOverride ? atcbWcParams : atcbWcProParams) : directData;
      const response = await fetch(`https://${dataOverrides.dev ? 'event-dev.caldn.net' : 'event.caldn.net'}/${licenseKey}/config.json`);
      if (response.ok) {
        const data = await response.json();
        if (proOverride) {
          const host = window.location.hostname || '';
          const domain = host.split('.').slice(-2).join('.');
          atcbWcParams.forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(dataOverrides, key) && (['hideBranding', 'ty', 'rsvp'].indexOf(key) === -1 || domain === 'caldn.net' || domain === 'add-to-calendar-pro.com')) {
              data[`${key}`] = dataOverrides[`${key}`];
            }
          });
        } else {
          atcbWcProParams.forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(dataOverrides, key)) {
              data[`${key}`] = dataOverrides[`${key}`];
            }
          });
        }
        if (dataOverrides.rsvp && Object.prototype.hasOwnProperty.call(dataOverrides.rsvp, 'none')) {
          delete data.rsvp;
        }
        if ((!data.name || data.name === '') && (!data.dates || data.dates[0].name === '')) {
          throw new Error('Not possible to read proKey config from server...');
        }
        if (data.landingpage.domain && data.landingpage.domain !== '' && atcb_secure_url(data.landingpage.domain)) {
          data.domain = data.landingpage.domain;
          delete data.landingpage;
        }
        if ((!data.proxy || data.proxy === '') && (!data.hideBranding || data.hideBranding === '')) {
          for (let i = 0; i < data.dates.length; i++) {
            if (data.dates[`${i}`].description && data.dates[`${i}`].description !== '') {
              data.dates[`${i}`].description += '[br][br][p]Powered by add-to-calendar-pro.com[/p]';
            } else {
              data.dates[`${i}`].description = 'Powered by add-to-calendar-pro.com';
            }
          }
          if (data.description && data.description !== '') {
            data.description += 'Powered by add-to-calendar-pro.com';
          }
        }
        data.proKey = licenseKey;
        data.identifier = licenseKey;
        return data;
      }
      throw new Error('Not possible to read proKey config from server...');
    } catch (originalError) {
      console.error(originalError);
      throw new Error('proKey invalid or server not responding!');
    }
  }
  return {};
}
function atcb_set_global_event_listener(host, data) {
  if (!atcbIsBrowser()) {
    return;
  }
  if (data.lightMode == 'bodyScheme') {
    lightModeMutationObserver[data.identifier] = new MutationObserver(function (mutationsList) {
      mutationsList.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          atcb_set_light_mode(host, data);
        }
      });
    });
    lightModeMutationObserver[data.identifier].observe(document.documentElement, { attributes: true });
    lightModeMutationObserver[data.identifier].observe(document.body, { attributes: true });
  }
  if (!atcbInitialGlobalInit) {
    document.addEventListener('keyup', atcb_global_listener_keyup);
    document.addEventListener('keydown', atcb_global_listener_keydown);
    window.addEventListener('resize', atcb_global_listener_resize);
  }
}
function atcb_global_listener_keyup(event) {
  const host = (function () {
    const root = document.querySelector('[atcb-button-id="' + atcbStates['active'] + '"]');
    if (root) {
      return root.shadowRoot;
    }
    return null;
  })();
  if (host && event.key === 'Escape') {
    atcb_log_event('closeList', 'Ecs Hit', atcbStates['active']);
    atcb_toggle(host, 'close', '', '', true);
  }
}
function atcb_global_listener_keydown(event) {
  const host = (function () {
    const root = document.querySelector('[atcb-button-id="' + atcbStates['active'] + '"]');
    const rootModal = document.getElementById(atcbStates['active'] + '-modal-host');
    if (rootModal) {
      return rootModal.shadowRoot;
    }
    if (root) {
      return root.shadowRoot;
    }
    return null;
  })();
  if (host && host.querySelector('.atcb-list') && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Tab')) {
    event.preventDefault();
    let targetFocus = 0;
    let currFocusOption = host.activeElement;
    const optionListCount = host.querySelectorAll('.atcb-list-item').length;
    if (currFocusOption && currFocusOption.classList.contains('atcb-list-item')) {
      if (event.key === 'ArrowDown' && currFocusOption.dataset.optionNumber < optionListCount) {
        targetFocus = parseInt(currFocusOption.dataset.optionNumber) + 1;
      } else if (event.key === 'Tab') {
        if (currFocusOption.dataset.optionNumber < optionListCount) {
          targetFocus = parseInt(currFocusOption.dataset.optionNumber) + 1;
        } else {
          targetFocus = 1;
        }
      } else if (event.key === 'ArrowUp' && currFocusOption.dataset.optionNumber >= 1) {
        targetFocus = parseInt(currFocusOption.dataset.optionNumber) - 1;
      }
      if (targetFocus > 0) {
        host.querySelector('.atcb-list-item[data-option-number="' + targetFocus + '"]').focus();
      }
    } else {
      switch (event.key) {
        default:
          host.querySelector('.atcb-list-item[data-option-number="1"]').focus();
          break;
        case 'ArrowUp':
          host.querySelector('.atcb-list-item[data-option-number="' + optionListCount + '"]').focus();
          break;
      }
    }
  }
}
function atcb_global_listener_resize() {
  const host = (function () {
    const root = document.querySelector('[atcb-button-id="' + atcbStates['active'] + '"]');
    const rootModal = document.getElementById(atcbStates['active'] + '-modal-host');
    if (rootModal) {
      return rootModal.shadowRoot;
    }
    if (root) {
      return root.shadowRoot;
    }
    return null;
  })();
  if (host) {
    const activeOverlay = host.querySelector('#atcb-bgoverlay');
    if (activeOverlay) {
      atcb_set_fullsize(activeOverlay);
      atcb_manage_body_scroll(host);
    }
  }
}
function atcb_unset_global_event_listener(identifier) {
  if (typeof lightModeMutationObserver[`${identifier}`] !== 'undefined') {
    lightModeMutationObserver[`${identifier}`].disconnect();
  }
}

export { atcb_action, i18nStrings };