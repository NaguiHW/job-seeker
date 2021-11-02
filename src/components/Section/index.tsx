import './index.scss';

const Section = (
  {
    title,
    icon,
    content,
    list,
  } : {
    title: string;
    icon: any;
    content?: string;
    list?: {
      master: [],
      expert: [],
      proficient: [],
    },
  }
) => (
  <section className="section">
    <div className="title">
      {icon}
      <h3>{title}</h3>
    </div>
    <p>{content}</p>
  </section>
);

export default Section;
