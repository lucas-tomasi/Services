(function (root, factory) {

    "use strict";

    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'), require('bootstrap'));
    }
    // AMD module is defined
    else if (typeof define === "function" && define.amd) {
        define("bootstrap-dialog", ["jquery", "bootstrap"], function ($) {
            return factory($);
        });
    } else {
        // planted over the root!
        root.MyTranslate = factory(root.jQuery);
    }

}
(this, function ($)
{
    "use strict";

    var MyTranslate = new Object();

    var _translate = {
        en: {
            CLOSE: "Close", REVIEWS: "Reviews", CONCLUDE: "Conclude", ACCEPT: "Accept", REJECT: "Reject", NAME: "Name", MONEY: "$", SERVICE: "Service", SERVICES: "Services",
            USER: "User", USERS: "Users", DATE: "Date", STATE: "State", CATEGORY: "Category", CATEGORIES: "Categories", PRICE: "Price", TOTAL: "Total", DETAIL: "Detail", DETAILS: "Details",
            PHONE: "Phone", STREET: "Street", DISTRICT: "District", CITY: "City", LOGIN_WITH: "Sign in with", LOGIN: "Login", PASS: "Password", REQUIRED: "Required", IS: "is", MINIMU: "Minimum",
            SUCCESS: "Success", ALERT: "Alter", ERROR: "Error", MAX: "Maximum", CHAR: "characters", YES_DO_IT: "Yes, do it" , SURE: "Are you sure?" , PLEASE: "Please" , ACTIVE: "Active" , INACTIVE: "Inactive",
            STATE_A: "Waiting Accept" , STATE_E: "Waiting Realization" , STATE_C: "Rejected" , STATE_X: "Completed" , STATE_Z: "Unrealized", NEW: "New",NEW_O: "New", BACK_LIST: "Back to list", SUBMIT: "Submit",
            NEXT: "Next", PREV: "Prev", CANCEL: "Cancel", RESERVE: "Reserve", HOUR: "Hour" , HOURS: "Hours" , PROFESSIONAL: "Professional", START: "Start", END: "End", MY_O: "My", MY_A: "My", MY_AS: "My", ADDRESS: "Address", RESERVATIONS: "Reservations", GO_HOME: "Go home",
            TITLE: 'Title', DESCRIPTION: "Description", BACK: "Back", ALL: "All", COMMENT: "Comment", COMMENT: "Comments", LEAVE: "Leave", A: "a", AT: "at", MAKE_RESERVATION: "Reserve", DATE_LARGE: "Choose a larger date",
            LOGOUT: "Logout", NUMBER: "Number", MENU: "Main" , ENTRIES: "Entries", STATISTICS: "Reservations Statistics" , ACTIONS: 'Actions', REPORTS: "Reports" , QUANT: "Quantity", BACK_TO: "Back to", DELETE: "Delete", DETAILS_RESERVE: "write details the reserve",
            PERFORMED: "Performed", STARS: "Stars", BACK_FORM: "Back to Form", GENERATE: "Generate", TYPE: "Type", IMAGES: "Images", INFO: "Info", ACCOUNT: "Account", PHOTO: "Photo", LOGO: "The Best Service You Can Find Here",
            ERR_LOGIN: "Login and/or Password invalids", CODE: "Code", DELETED: "Deleted", SAVE: "Saved", MAX_PRICE: "Max Price", MAX_STARS: "Max Stars", MAX_REVIEWS: "Max Reviews", MIN_PRICE: "Min Price", MIN_STARS: "Min Stars", MIN_REVIEWS: "Min Reviews",
            REPORT_USER: "User Report", REPORT_SERVICES: "Services Report", ERROR_USER_SAVE: "Error saving user", ERROR_RESERVE_SAVE: "Error saving reserve", NO_RESERVE: "You don't have reservations", SORRY: "Sorry, there was an error", PLEASE_ANSWER: "Please, write a answer!",
            CONFIRM: "Confirm", PLEASE_LOGIN: "Please, login", LANG_PT: "Portuguese", LANG_EN: "English", REMOVE_RESERVATION: "Clear", CLEAR_RESERVATIONS: "Do you want to delete the selected reservations?", "START": "Start", "END": "End", 'PROVIDER': "Provider",
        },
        pt: {
            REVIEWS: "Avaliações", SUCCESS: "Sucesso", ALERT: "Alerta", ERROR: "Erro", CLOSE: "Fechar", CONCLUDE: "Concluir", ACCEPT: "Aceitar", REJECT: "Rejeitar", NAME: "Nome", MONEY: "R$", SERVICE: "Serviço", SERVICES: "Serviços", USER: "Usuário",
            USERS: "Usuários", DATE: "Data", STATE: "Estado", CATEGORY: "Categoria", CATEGORIES: "Categorias", PRICE: "Preço", TOTAL: "Total", DETAIL: "Detalhe", DETAILS: "Detalhes", PHONE: "Fone", STREET: "Rua", DISTRICT: "Bairro", CITY: "Cidade",
            LOGIN_WITH: "Entrar com", LOGIN: "Entrar", PASS: "Senha", REQUIRED: "Obrigatório", IS: "é", MINIMU: "Mínimo", MAX: "Máximo", CHAR: "caracteres", YES_DO_IT: "Sim, faça isso!", SURE: "Você tem certeza?" , PLEASE: "Por favor" , ACTIVE: "Ativo" , INACTIVE: "Inativo",
            STATE_A: "Esperando aceitação" , STATE_E: "Esperando realização" , STATE_C: "Rejeitada" , STATE_X: "Realizada" , STATE_Z: "Não realizada", NEW: "Nova", NEW_O: "Novo", BACK_LIST: "Voltar para listagem", SUBMIT: "Salvar",
            NEXT: "Avançar", PREV: "Voltar", CANCEL: "Cancelar", RESERVE: "Reservar", HOUR: "Hora" , HOURS: "Horas" , PROFESSIONAL: "Prefissional", START: "Início", END: "Fim", MY_A: "Minha", MY_AS: "Minhas" ,MY_O: "Meu", ADDRESS: "Endereço", RESERVATIONS: "Reservas", GO_HOME: "Voltar para o início",
            TITLE: 'Título', DESCRIPTION: "Descrição", BACK: "Voltar", ALL: "Todos", COMMENT: "Comentário", COMMENTS: "Comentários", LEAVE: "Escreva" , A: "um", AT: "Até", MAKE_RESERVATION: "Reservar", DETAILS_RESERVE: "escreva os detalhes da reserva" ,
            PERFORMED: "Concluidas", STARS: "Estrelas", BACK_FORM: "Voltar para o formulário", GENERATE: "Gerar", TYPE: "Tipo", IMAGES: "Imagens", INFO: "Info", ACCOUNT: "conta", PHOTO: "Foto", LOGO: "O melhor serviço você encontra aqui",
            LOGOUT: "Sair", NUMBER: "Número", MENU: "Menu" , ENTRIES: "Cadastros", STATISTICS: "Estatísticas de reservas" , ACTIONS: 'Ações', REPORTS: "Relatórios", ERR_LOGIN: "Usuário e/ou Senha inválidos", CODE: "Código", DELETED: "Deletado", SAVE: "Salvo", QUANT: "Quantidade", BACK_TO: "Voltar para",
            MAX_PRICE: "Maiores Preços", MAX_STARS: "Mais Estrelas", MAX_REVIEWS: "Maiores Avaliações", MIN_PRICE: "Menores Preços", MIN_STARS: "Menos Estrelas", MIN_REVIEWS: "Menores Avaliações",  SORRY: "Desculpe, houve um erro", "START": "Início" , "END": "Fim",
            REPORT_USER: "Relatório de Usuários", REPORT_SERVICES: "Relatório de Serviços", ERROR_USER_SAVE: "Erro ao salvar usuário", ERROR_RESERVE_SAVE: "Erro ao salvar reservas", NO_RESERVE: "Você não possui reservas", PLEASE_ANSWER: "Por favor, escreva uma resposta!", DELETE: "Excluir",
            CONFIRM: "Confirmar", PLEASE_LOGIN: "Por favor, faça o login", DATE_LARGE: "Selecione uma data maior que", LANG_PT: "Português", LANG_EN: "Inglês", REMOVE_RESERVATION: "Limpar", CLEAR_RESERVATIONS: "Deseja apagar as reservas selecionadas?", 'PROVIDER': 'Provedor',
        }
    };

    MyTranslate.getTranslations = function( language )
    {
        return _translate[ language ];
    };

    MyTranslate.get = function( key )
    {
        var lang = (MySession.get( 'language' ))?MySession.get( 'language' ): 'pt';
        return _translate[ lang ][ key ];
    };

    return MyTranslate;
}));
