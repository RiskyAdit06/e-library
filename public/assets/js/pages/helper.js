function getToken() {
  // Ambil value 'token' dari cookie
  const match = document.cookie.match(new RegExp('(^|; )' + 'token' + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : null;
}

