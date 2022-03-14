export const customSelectStyles = {
  menuPortal: base => ({
    ...base,
    zIndex: 9999,
    fontSize: '14px',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;',
  }),
  placeholder: (provided, state) => ({
    ...provided,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '33px',
    minHeight: '33px',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '33px',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '26px',
  }),
};

export default customSelectStyles;
