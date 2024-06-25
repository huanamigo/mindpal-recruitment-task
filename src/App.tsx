import { useDispatch } from 'react-redux';
import { addNotification } from './store';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addNotification({
        id: '1',
        type: 'request',
        message: 'New request received',
        read: false,
      })
    );
    dispatch(
      addNotification({
        id: '2',
        type: 'status_change',
        message: 'Status changed to on hold',
        read: false,
      })
    );
    dispatch(
      addNotification({
        id: '3',
        type: 'new_feature',
        message: 'New feature added',
        read: false,
      })
    );
  }, [dispatch]);

  return <Navbar />;
};

export default App;
