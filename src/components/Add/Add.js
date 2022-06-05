import AddForm from './AddForm';
import classes from './Add.module.css';

const Add = () => {
  return (
    <section className={classes.profile}>
      <h1>Add an employee</h1>
      <AddForm />
    </section>
  );
};

export default Add;
