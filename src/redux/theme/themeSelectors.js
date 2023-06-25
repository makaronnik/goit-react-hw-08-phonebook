import { darkTheme, lightTheme } from 'theme/theme';

export const getTheme = state =>
  state.theme.darkTheme ? darkTheme : lightTheme;
