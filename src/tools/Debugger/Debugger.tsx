import { DebugMapper } from './DebugMapper';
import { DataContext } from 'src/instances/DataContext';

let mapper: DebugMapper;

export function EnableDebugger(): void {
  const dataContext = DataContext;
  if (!mapper) {
    mapper = new DebugMapper(dataContext);
  }
}
