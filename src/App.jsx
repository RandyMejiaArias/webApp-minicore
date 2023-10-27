import { AppRouter } from "./router/AppRouter";
import { AppTheme } from './theme/AppTheme';

export const MinicoreApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
}
