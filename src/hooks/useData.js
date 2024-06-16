import { useContext } from "react";
import DataContext from "../contexts/DataContext";


export const useData = () => {
	return useContext(DataContext)
}

export default useData