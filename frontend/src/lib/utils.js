import { format } from "date-fns";

export const parseTimestamp = (t) => {
  const utcSeconds = t;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return format(d, "yyyy-MM-dd HH:mm");
};

export const formatCommit = (commit, commit_msg) => {
  // Limit the git commit sha to 12 characters to improve readability
  var commitString = commit.substring(0, 12);
  if (commit_msg !== "") {
    commitString += ' ("' + commit_msg + '")';
  }
  return commitString;
};
