export const requestEndpoints = {
   auth: {
      login: "/auth/login",
      signUp: "/auth/signup"
   },
   stories: {
      one: (id) => `/stories/${id}`,
      oneBySlug: (slug) => `/stories/slug?slug=${slug}`,
      all: "/stories",
      feed: "/stories/feed",
      create: "/stories",
      delete: "/stories",
      like: (id) => `/stories/${id}/like`,
      save: (id) => `/stories/${id}/save`,
      comments: (id) => `/stories/${id}/comments`
   },
   comments: {
      create: (id) => `/comments?storyId=${id}`,
      update: (id) => `/comments/${id}`,
      delete: (id) => `/comments/${id}`,
      like: (id) => `/comments/${id}/like`,
      dislike: (id) => `/comments/${id}/dislike`
   },
   users: {
      stories: (id) => `/users/${id}/stories`,
      one: (id) => `/users/${id}`,
      moreData: (id, key) => `/users/${id}/${key}`,
      oneByQuery: (query) => `/users/username?${query}`,
      update: (id) => `/users/${id}`,
      follow: (id) => `/users/${id}/follow`,
      unfollow: (id) => `/users/${id}/unfollow`,
      resetPassword: (id) => `/users/${id}/reset-password`
   },
   images: {
      upload: "/images",
      delete: (query) => `/images?key=${query}`
   }
}