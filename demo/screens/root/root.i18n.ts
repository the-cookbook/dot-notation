import { defineMessages } from 'react-intl';

const oneSignal = {
  prompt: defineMessages({
    message: {
      id: 'pages.root.oneSignal.prompt.message',
      defaultMessage: 'We would like to show you notifications about new Centerline Recommendations and Updates!',
    },
    btnAccept: {
      id: 'pages.root.oneSignal.prompt.btnAccept',
      defaultMessage: 'ALLOW',
    },
    btnCancel: {
      id: 'pages.root.oneSignal.prompt.btnCancel',
      defaultMessage: 'NO, THANKS',
    },
  }),
};

export default {
  pages: {
    root: {
      oneSignal,
    },
  },
};
