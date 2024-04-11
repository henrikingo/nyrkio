import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { parseGitHubRepo, dashboardTypes } from "../lib/utils";
import { TableOrResult } from "./TableOrResult";

export const PublicDashboard = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState(undefined);
  const [publicData, setPublicData] = React.useState([]);

  const fetchPublicTests = async () => {
    const response = await fetch("/api/v0/public/results");
    const publicData = await response.json();
    console.debug(publicData);

    let results = [];
    publicData.map((result) => {
      const url = parseGitHubRepo(result);
      console.debug("url: " + url);
      results.push(url);
    });
    setPublicData(results);
  };

  useEffect(() => {
    setLoading(true);

    var path = location.pathname.substring("/public".length);
    if (path.startsWith("/")) {
      path = path.substring(1);
    }

    // The path parsing code relies on using "path === undefined"
    // as a signal that the user is at the root of a dashboard.
    if (path === "") path = undefined;

    setPrefix(path);

    fetchPublicTests().finally(() => {
      setLoading(false);
    });
  }, [location]);

  const baseUrls = {
    testRootTitle: "GH Repos",
    api: "/api/v0/public/result/",
    testRoot: "/public",
    results: "/public",
    result: "public",
    tests: "public",
    breadcrumbTestRootTitle: "GitHub Repos",
  };

  return (
    <div className="container">
      <div className="row text-center">
        <h1 className="mb-4">Public Test Results</h1>
        <p>Public benchmark results as shared by Nyrkiö users.</p>
      </div>
      <div className="row justify-content-center text-center pt-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableOrResult
            prefix={prefix}
            data={publicData}
            baseUrls={baseUrls}
            dashboardType={dashboardTypes.PUBLIC}
          />
        )}
      </div>
    </div>
  );
};
