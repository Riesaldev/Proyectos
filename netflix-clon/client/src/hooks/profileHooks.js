import toast from 'react-hot-toast';

export const useDeleteProfile = ( authToken, setProfiles, profiles ) => {
    return async ( profileId ) => {
        try
        {
            const response = await fetch( `${ import.meta.env.VITE_API_URL }/api/users/profiles/${ profileId }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`,
                },
            } );

            const body = await response.json();

            if ( !response.ok )
            {
                throw new Error( body.message || 'Error al eliminar el perfil.' );
            }

            setProfiles( profiles.filter( ( profile ) => profile.profileId !== profileId ) );
            toast.success( 'Perfil eliminado correctamente.' );
        } catch ( error )
        {
            toast.error( error.message || 'Error al eliminar el perfil.' );
        }
    };
};

export const useEditProfile = ( authToken, setProfiles, profiles ) => {
    return async ( profileId ) => {
        try
        {
            const response = await fetch( `${ import.meta.env.VITE_API_URL }/api/users/profiles/${ profileId }`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ authToken }`,
                },
                body: JSON.stringify( { /* datos de edición */ } ),
            } );

            const body = await response.json();

            if ( !response.ok )
            {
                throw new Error( body.message || 'Error al editar el perfil.' );
            }

            setProfiles( profiles.map( ( profile ) => ( profile.profileId === profileId ? body.data.profile : profile ) ) );
            toast.success( 'Perfil editado correctamente.' );
        } catch ( error )
        {
            toast.error( error.message || 'Error al editar el perfil.' );
        }
    };
};
