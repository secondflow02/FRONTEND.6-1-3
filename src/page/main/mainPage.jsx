import axios from 'axios';
import { useEffect, useState } from 'react';

import MainPagination from './mainPagination';

const MainPage = () => {
    const [issues, setIssues] = useState([]);
    const [state, setState] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const token = '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';
    const repoOwner = 'angular';
    const repoName = 'angular-cli';
    const perPage = 200;

    const issuesItems = issues.map(issues => {
        return (
            <li key={issues.id}>
                <p>{issues.title}</p>
                <p>{issues.body.substring(0, 150)}......</p>
            </li>
        );
    });

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const issuseJson = await axios.get(
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

                console.log(issuseJson.data[0].body, 'json');
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
                console.log(issuseResponse.data[0].body, 'repo');
                setIssues(issuseResponse.data);
            } catch (error) {
                console.error('Error fetching repository data:', error);
            }
        };
        fetchRepoData();
    }, [repoOwner, repoName, token]);

    return (
        <>
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
