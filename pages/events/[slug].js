import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";

export default function EventPage({event}) {
  // console.log("event----------------",event);
  // console.log(  'eventID----------- ' ,event.id)
  const router = useRouter()

  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${event.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
        <Link href={`/events/edit/${event.id}`} legacyBehavior>
            <a>
              <FaPencilAlt />
              Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete
          </a>
        </div>
        <span>
          {new Date(event.attributes.date).toLocaleDateString("en-US")} at {event.attributes.time}
        </span>
        <h1>{event.attributes.name}</h1>
        <ToastContainer />
        {event.attributes.image && (
          <div className={styles.image}>
            <Image
              src={
                event.attributes.image.data
                  ? event.attributes.image.data.attributes.formats.large.url
                  : "/images/event-default.png"
              }
              width={760}
              height={500}
              alt={"Image"}
            />
          </div>
        )}
        <h3>Performers</h3>
        <p>{event.attributes.performers}</p>
        <h3>Description</h3>
        <p>{event.attributes.description}</p>
        <h3>Venue: {EventTarget.venue}</h3>
        <p>{event.attributes.address}</p>

        <Link href={"/events"} legacyBehavior>
          <a className={styles.back}> {"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
    // <h1>hello</h1>
  );

  // return (
  //   <Layout>

  //     <div className={styles.event}>
  //       <div className={styles.controls}>
  //         {/* <Link href={`/events/edit/${evt.id}`}>

  //             <FaPencilAlt /> Edit Event

  //         </Link> */}
  //         <a href='#' className={styles.delete} onClick={deleteEvent}>
  //           <FaTimes /> Delete Event
  //         </a>
  //       </div>

  //       <span>
  //         {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
  //       </span>
  //       <h1>{evt.name}</h1>
  //       {evt.image && (
  //         <div className={styles.image}>
  //           <Image
  //             src={evt.image.data.attributes.formats.medium.url}
  //             width={960}
  //             height={600}
  //           />
  //         </div>
  //       )}

  //       <h3>Performers:</h3>
  //       <p>{evt.performers}</p>
  //       <h3>Description:</h3>
  //       <p>{evt.description}</p>
  //       <h3>Venue: {evt.venue}</h3>
  //       <p>{evt.address}</p>

  //       <Link className={styles.back} href='/events'>
  //       {'<'} Go Back
  //       </Link>
  //     </div>
  //   </Layout>
  // )
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events?populate=*`)
//   const {data:events} = await res.json()

//   const paths = events.map((evt) => ({
//     params: { slug: evt.attributes.slug },
//   }))

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events?slug=${slug}`)
//   const {data:events} = await res.json()
//   console.log(events)

//   return {
//     props: {
//       evt: {events},
//     },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const event = await res.json();
  // console.log(event);
  // console.log("query",query);
  const newevent = [];
  // const newevent=event.data.filter(evt=>{evt.attributes.slug==slug})

  event.data.forEach((evt) => {
    if (evt.attributes.slug == slug) {
      newevent.push(evt);
    }
  });
  // console.log("newevent", newevent);
  return {
    props: {
      event:newevent[0]
    }
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
