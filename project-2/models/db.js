function makeIdGenerator(start = 1) {
  let current = start;
  return () => current++;
}

const nextUserId = makeIdGenerator(1);
const nextPostId = makeIdGenerator(1);

const users = [
  {
    id: nextUserId(), name: 'Arjun Sharma',
    email: 'arjun@decodelabs.tech', role: 'admin',
    createdAt: new Date('2026-01-10').toISOString(),
  },
  {
    id: nextUserId(), name: 'Priya Singh',
    email: 'priya@decodelabs.tech', role: 'intern',
    createdAt: new Date('2026-01-15').toISOString(),
  },
  {
    id: nextUserId(), name: 'Rahul Verma',
    email: 'rahul@decodelabs.tech', role: 'intern',
    createdAt: new Date('2026-01-20').toISOString(),
  },
];

const posts = [
  {
    id: nextPostId(), userId: 1,
    title: 'Project 1 Complete — Responsive Frontend Interface',
    content: 'Built a fully responsive UI using HTML5, CSS3, and vanilla JS.',
    published: true, createdAt: new Date('2026-05-01').toISOString(),
  },
  {
    id: nextPostId(), userId: 2,
    title: 'Learning RESTful API Design',
    content: 'Resources are nouns. Methods are verbs. Keep it stateless.',
    published: true, createdAt: new Date('2026-05-10').toISOString(),
  },
  {
    id: nextPostId(), userId: 1,
    title: 'HTTP Status Codes Every Dev Must Know',
    content: '200 OK · 201 Created · 400 Bad Request · 404 Not Found · 500 Internal Error.',
    published: false, createdAt: new Date('2026-05-15').toISOString(),
  },
];

const db = {
  users: {
    findAll    : ()      => [...users],
    findById   : (id)    => users.find(u => u.id === Number(id)) || null,
    findByEmail: (email) => users.find(u => u.email === email) || null,
    create: (data) => {
      const user = { id: nextUserId(), ...data, createdAt: new Date().toISOString() };
      users.push(user);
      return user;
    },
    update: (id, data) => {
      const idx = users.findIndex(u => u.id === Number(id));
      if (idx === -1) return null;
      users[idx] = { ...users[idx], ...data, id: users[idx].id };
      return users[idx];
    },
    delete: (id) => {
      const idx = users.findIndex(u => u.id === Number(id));
      if (idx === -1) return null;
      return users.splice(idx, 1)[0];
    },
  },
  posts: {
    findAll   : ()    => [...posts],
    findById  : (id)  => posts.find(p => p.id === Number(id)) || null,
    findByUser: (uid) => posts.filter(p => p.userId === Number(uid)),
    create: (data) => {
      const post = { id: nextPostId(), ...data, createdAt: new Date().toISOString() };
      posts.push(post);
      return post;
    },
  },
};

module.exports = db;