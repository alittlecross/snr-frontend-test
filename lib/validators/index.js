const validate = (form) => {
  if (!form.postcode) {
    return 'Enter a postcode';
  }

  const regExp = /^(?![QVX])[A-Z]((?![IJZ])[A-Z][0-9](([0-9]?)|([ABEHMNPRVWXY]?))|([0-9]([0-9]?|[ABCDEFGHJKPSTUW]?))) ?[0-9]((?![CIKMOV])[A-Z]){2}$|^(BFPO)[ ]?[0-9]{1,4}$/;

  if (!regExp.test(form.postcode.toUpperCase())) {
    return 'Enter a postcode in the correct format, like NE15 6BW';
  }

  return null;
};

module.exports = validate;
