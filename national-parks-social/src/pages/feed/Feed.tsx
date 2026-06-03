import { nationalParks } from "../../lib/parks";

const yosemite = nationalParks.find((park) => park.name === "Yosemite");
const zion = nationalParks.find((park) => park.name === "Zion");
const acadia = nationalParks.find((park) => park.name === "Acadia");
const grandCanyon = nationalParks.find((park) => park.name === "Grand Canyon");
const arches = nationalParks.find((park) => park.name === "Arches");
const olympic = nationalParks.find((park) => park.name === "Olympic");

function hasImage(image: string | undefined): image is string {
  return Boolean(image);
}

const feedPosts = [
  {
    id: 1,
    user: "Maya Chen",
    username: "@maya.hikes",
    avatar: "M",
    park: yosemite?.name ?? "Yosemite",
    state: yosemite?.state ?? "CA",
    images: [yosemite?.image, grandCanyon?.image].filter(hasImage),
    body: "Caught the sunset in Yosemite Valley. The view was incredible and I would definitely come back.",
    likes: 42,
    comments: 8,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    user: "Jordan Lee",
    username: "@jordan.outdoors",
    avatar: "J",
    park: zion?.name ?? "Zion",
    state: zion?.state ?? "UT",
    images: [zion?.image, arches?.image, olympic?.image].filter(hasImage),
    body: "First time hiking in Zion. The canyon views made this one of my favorite park visits so far.",
    likes: 31,
    comments: 4,
    timeAgo: "5h ago",
  },
  {
    id: 3,
    user: "Sofia Rivera",
    username: "@sofia.trails",
    avatar: "S",
    park: acadia?.name ?? "Acadia",
    state: acadia?.state ?? "ME",
    images: [acadia?.image].filter(hasImage),
    body: "Morning walk near the coast at Acadia. The ocean views and trails were peaceful.",
    likes: 27,
    comments: 6,
    timeAgo: "1d ago",
  },
];

function PostImages({
  images,
  park,
}: {
  images: string[];
  park: string;
}) {
  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={`${park} National Park`}
        className="aspect-[4/3] w-full object-cover"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-1 bg-zinc-100">
      {images.map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt={`${park} National Park photo ${index + 1}`}
          className="aspect-square w-full object-cover"
        />
      ))}
    </div>
  );
}

export default function Feed() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50 px-4 py-6">
      <section className="mx-auto max-w-2xl">
        <header className="mb-5">
          <h2 className="text-2xl font-semibold">Feed</h2>
          <p className="mt-1 text-sm text-zinc-500">
            See what people are sharing from national parks.
          </p>
        </header>

        <div className="mb-5 rounded-md border border-zinc-200 bg-white p-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
              A
            </div>

            <button
              type="button"
              className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-50"
            >
              Share a park update...
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {feedPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-md border border-zinc-200 bg-white"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white">
                  {post.avatar}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{post.user}</h3>
                    <span className="text-xs text-zinc-500">
                      {post.timeAgo}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500">
                    {post.username} visited {post.park}, {post.state}
                  </p>
                </div>
              </div>

              <PostImages images={post.images} park={post.park} />

              <div className="space-y-3 p-4">
                <p className="text-sm leading-6 text-zinc-700">{post.body}</p>

                <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-sm text-zinc-600">
                  <button type="button" className="hover:text-emerald-700">
                    Like
                  </button>

                  <button type="button" className="hover:text-emerald-700">
                    Comment
                  </button>

                  <button type="button" className="hover:text-emerald-700">
                    Save
                  </button>
                </div>

                <p className="text-xs text-zinc-500">
                  {post.likes} likes · {post.comments} comments
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
