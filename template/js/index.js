const likeIcons = document.querySelectorAll(".like-icon");
const upVoteIcons = document.querySelectorAll(".up-vote-icon");
const downVoteIcons = document.querySelectorAll(".down-vote-icon");
const commentIcons = document.querySelectorAll(".comment-icon");

const likeIconCounts = document.querySelectorAll(".like-icon-count");
const upVoteIconCounts = document.querySelectorAll(".up-vote-icon-count");
const downVoteIconCounts = document.querySelectorAll(".down-vote-icon-count");
const commentIconCounts = document.querySelectorAll(".comment-icon-count");

let hasLiked = false;
let hasVoted = false;

function incrementLikesCount() {
    if (!hasLiked) {
        hasLiked = true;
        const parentNode = this.parentNode;
        let count = parseInt(parentNode.lastElementChild.innerText);
        count = count + 1;
        parentNode.lastElementChild.innerText = count;
    } else {
        hasLiked = false;
        const parentNode = this.parentNode;
        let count = parseInt(parentNode.lastElementChild.innerText);
        count = count - 1;
        parentNode.lastElementChild.innerText = count;
    }
}

function incrementUpVotesCount(e) {
    const parentNode = e.path[2];
    let count = parseInt(parentNode.children[1].innerText);
    if (e.target.className == "fa fa-thumbs-o-up" && !hasVoted) {
        hasVoted = true;
        count = count + 1;
        parentNode.children[1].innerText = count;
        return;
    }
}

function incrementDownVotesCount(e) {
    const parentNode = e.path[2];
    let count = parseInt(parentNode.children[1].innerText);
    if (e.target.className == "fa fa-thumbs-o-down" && hasVoted) {
        hasVoted = false;
        count = count - 1;
        parentNode.children[1].innerText = count;
        return;
    }
}

function incrementVotesCount(e) {
    if (!hasVoted) {
        incrementUpVotesCount(e);
    } else {
        incrementDownVotesCount(e);
    }
}

function incrementCommentCount() {

}

likeIcons.forEach(likeIcon => likeIcon.addEventListener('click', incrementLikesCount));
upVoteIcons.forEach(upVoteIcon => upVoteIcon.addEventListener('click', incrementVotesCount));
downVoteIcons.forEach(downVoteIcon => downVoteIcon.addEventListener('click', incrementVotesCount));
commentIcons.forEach(commentIcon => commentIcon.addEventListener('', incrementCommentCount));