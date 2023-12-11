import axios from 'axios';
import { useEffect, useState } from 'react';

import MainPagination from './mainPagination';

const MainPage = () => {
    const [repoData, setRepoData] = useState(null);
    const [issues, setIssues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = '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';
    const repoOwner = 'angular';
    const repoName = 'angular-cli';
    const perPage = 100;

    const issuesItems = issues.map(issues => (
        <li key={issues.id}>
            <p>{issues.title}</p>
            {/* <p>{issues.body}</p> */}
        </li>
    ));

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const response = await axios.get(
                    `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page: currentPage,
                            per_page: perPage,
                        },
                    },
                );
                setRepoData(response.data);

                // Fetch issue data
                const issuseResponse = await axios.get(
                    `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            page: currentPage,
                            per_page: perPage,
                        },
                    },
                );
                setIssues(issuseResponse.data);
            } catch (error) {
                console.error('Error fetching repository data:', error);
            }
        };
        fetchRepoData();
    }, [repoOwner, repoName, token]);

    return (
        <>
            {/* {issues.length > 0 ? (
                <ul>
                    {issues.map(issues => (
                        <li key={issues.id}>
                            <p>{issues.title}</p>
                            {/* <p>{issues.body}</p> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No issues found</p>
            )} */}
            <div>
                {issues.length > 0 ? (
                    <MainPagination items={issuesItems} itemsPage={10} />
                ) : (
                    <p>No issues found</p>
                )}
            </div>
        </>
    );
};
export default MainPage;
