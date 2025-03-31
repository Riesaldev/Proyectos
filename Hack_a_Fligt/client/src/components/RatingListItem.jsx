//importamos las dependencias que permiten validar las props
import PropTypes from 'prop-types';

//importamos la dependencia que permite formatear fechas
import moment from 'moment';

//iniciamos el componente
const RatingListItem = ( { title, rate, comment, createdAt, username } ) => {
    return (
<<<<<<< HEAD
        <li className='bg-light-blue border-2 border-accent-blue p-4 rounded-lg shadow-[10px_10px_25px_rgb()] shadow-accent-blue text-dark-blue'>
            <header>
                <h3 className='font-bold'>{title}</h3>
            </header>
            <div className='p-2'>
                <p className='font-semibold'>Valoración: {'⭐'.repeat( rate )}</p>
                <p>
                    <span className='font-semibold'>Descripción:</span>{' '}
                    {comment}
                </p>
            </div>
            <footer className='ml-2'>
                <p>Autor/a: {username}</p>
                <p className='font-light'>
                    Creada el {''}
                    {moment( createdAt ).format( 'DD/MM/YYYY [a las] HH:mm' )}
                </p>
            </footer>
        </li>
=======
        <>
            <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-dark-blue hover:scale-[1.008] mb-3'>
                <div className='text-right'>
                    <p>{'⭐'.repeat(rate)}</p>
                </div>
                <div className='text-left mb-3'>
                    <h3 className='font-bold text-xl text-dark-blue'>
                        {title}
                    </h3>
                </div>

                <div className='text-center mb-5'>
                    <p className='text-base text-dark-blue'>{comment}</p>
                </div>
                <div className='flex flex-col items-end'>
                    <p className='font-light text-sm text-medium-blue'>
                        {moment(createdAt).format('DD/MM/YYYY [a las] HH:mm')}
                    </p>
                    <p className='text-sm text-accent-blue'>@{username}</p>
                </div>
            </div>
        </>
>>>>>>> 24711dae5f05c6d30a66e20bb9384f657dfbebc1
    );
};

//validamos las propos
RatingListItem.propTypes = {
    ratingId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};
export default RatingListItem;
