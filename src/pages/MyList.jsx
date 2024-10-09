import PopUpProvider from '../Context/PopUpContext';
import '../components/RowStyle.scss';
import RowTwo from '../components/RowTwo';
import { myList } from '../store/URL';
import { useGetDataQuery } from '../store/tmdbApi';

function MyList() {
  const { data, refetch } = useGetDataQuery({ endpoint: myList });


  return (
    <PopUpProvider>
      <RowTwo data={data} refetch={refetch} />
    </PopUpProvider>
  );
}

export default MyList;
