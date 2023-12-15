import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Detail = () => {
    // 구조 분해 할당으로 추출
    const { issueId } = useParams();

    const [state, setState] = useState([]);

    const location = useLocation();

    const { issueData } = location.state || {};
    useEffect(() => {
        const fetchData = async () => {
            try {
                setState(issueData);
                console.log(issueData);
            } catch (error) {
                console.log('Error', error);
            }
        };

        fetchData();
    }, [issueId, location.search]);

    return (
        <>
            <div>
                <h2>{state?.title}</h2>
                <p>{state?.body}</p>
                <p>{state?.created_at}</p>
                {/* <p>{state?.user.login}</p> */}
            </div>
        </>
    );
};
export default Detail;
