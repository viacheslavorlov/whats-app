import { useDispatch } from 'react-redux';
// eslint-disable-next-line fsd-architecture-checker/layers-imports-order
import { AppDispatch } from 'app/providers/StoreProvider';

// export const useAppDispatch<AppDispatch> = useDispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
