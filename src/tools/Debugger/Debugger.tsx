import { DebugMapper } from './DebugMapper';
import { DataContext } from 'src/instances/DataContext';

export function EnableDebugger(): void {
  const dataContext = DataContext;
  new DebugMapper(dataContext);
}
