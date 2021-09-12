const express = require("express");
const servidor = express();
const mysql = require("mysql2");
const banco = mysql.createPool({
    database: "desafiobackend",
    user: "root",
    password: "",
    host: "localhost",
    port: "3306",
});

const bodyParser = require("body-parser");

servidor.use(bodyParser.urlencoded({ extended: false }));
servidor.use(bodyParser.json());

servidor.post("/quadro", (req, res, next) => {
    let body = req.body;
    const QUERY = `INSERT INTO quadro (nomeQuadro) VALUES('${body.nome}')`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Cadastro realizado com sucesso!",
            });
        });
    });
});

servidor.post("/tarefa", (req, res, next) => {
    let body = req.body;
    const QUERY = `INSERT INTO tarefa (nomeTarefa, statusTarefa, quadro_id) VALUES('${body.nome}', '${body.status}', '${body.quadro}')`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Cadastro realizado com sucesso!",
            });
        });
    });
});

servidor.post("/subtarefa", (req, res, next) => {
    let body = req.body;
    const QUERY = `INSERT INTO subtarefa (nomeSubtarefa, statusSubtarefa, tarefa_id) VALUES('${body.nome}', '${body.status}', '${body.tarefa}')`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Cadastro realizado com sucesso!",
            });
        });
    });
});

servidor.delete("/quadro/:id", (req, res, next) => {
    let id = req.params.id;
    const QUERY = `DELETE FROM quadro WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    mensagem: `Não foi possível excluir o quadro ${id}`,
                });
            }
            if (resultado.affectedRows > 0) {
                return res.status(200).send({
                    Mensagem: `Quadro ${id} excluído com sucesso`,
                });
            } else {
                return res.status(200).send({
                    Mensagem: `Quadro ${id} não existe no banco de dados`,
                });
            }
        });
    });
});

servidor.delete("/tarefa/:id", (req, res, next) => {
    let id = req.params.id;
    const QUERY = `DELETE FROM tarefa WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: `Não foi possível excluir a Tarefa ${id}`,
                });
            }
            if (resultado.affectedRows > 0) {
                return res.status(200).send({
                    Mensagem: `Tarefa ${id} excluída com sucesso`,
                });
            } else {
                return res.status(200).send({
                    Mensagem: `Tarefa ${id} não existe no banco de dados`,
                });
            }
        });
    });
});

servidor.delete("/subtarefa/:id", (req, res, next) => {
    let id = req.params.id;
    const QUERY = `DELETE FROM subtarefa WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: `Não foi possível excluir a Subtarefa ${id}`,
                });
            }
            if (resultado.affectedRows > 0) {
                return res.status(200).send({
                    Mensagem: `Subtarefa ${id} excluída com sucesso`,
                });
            } else {
                return res.status(200).send({
                    Mensagem: `Subtarefa ${id} não existe no banco de dados`,
                });
            }
        });
    });
});

servidor.get("/quadro/listar", (req, res, next) => {
    const QUERY = `SELECT * FROM quadro ORDER BY nomeQuadro`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/quadro/listar/:id", (req, res, next) => {
    let id = req.params.id;
    const QUERY = `SELECT * FROM quadro WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/tarefa/listar", (req, res, next) => {
    const QUERY = `SELECT * FROM tarefa ORDER BY nomeTarefa`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/tarefa/:id", (req, res, next) => {
    let id = req.params.id;
    const QUERY = `SELECT * FROM tarefa WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/tarefa/listar/:idquadro", (req, res, next) => {
    let idquadro = req.params.idquadro;
    const QUERY = `SELECT q.nomeQuadro, t.nomeTarefa, t.statusTarefa
                   FROM quadro as q
                   INNER JOIN tarefa as t on t.quadro_id = q.id
                   ORDER BY q.id = ${idquadro}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/subtarefa/listar", (req, res, next) => {
    const QUERY = `SELECT * FROM subtarefa ORDER BY nomeSubtarefa`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/subtarefa/:id", (req, res, next) => {
    let id = req.params.id;
    const QUERY = `SELECT * FROM subtarefa WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/subtarefa/listar/:idtarefa", (req, res, next) => {
    let idtarefa = req.params.idtarefa;
    const QUERY = `SELECT t.nomeTarefa, s.nomeSubtarefa, s.statusSubtarefa
                   FROM  tarefa as t
                   INNER JOIN subtarefa as s on s.tarefa_id = t.id
                   ORDER BY t.id = ${idtarefa}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.get("/subtarefa/listar/quadro/:idquadro", (req, res, next) => {
    let idquadro = req.params.idquadro;
    const QUERY = `SELECT q.nomeQuadro, t.nomeTarefa, t.statusTarefa, s.nomeSubtarefa, s.statusSubtarefa
                   FROM  tarefa as t
                   INNER JOIN subtarefa as s on s.tarefa_id = t.id
                   INNER JOIN quadro as q on q.id = t.quadro_id
                   WHERE q.id = ${idquadro}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                });
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado,
            });
        });
    });
});

servidor.patch("/quadro/:id", (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    const QUERY = `UPDATE quadro
                   SET nomeQuadro = '${body.nome}'
                   WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Atualização realizada com sucesso!",
            });
        });
    });
});

servidor.patch("/tarefa/:id", (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    const QUERY = `UPDATE tarefa
                 SET nomeTarefa = '${body.nome}',
                 statusTarefa = '${body.status}',
                 quadro_id = '${body.quadro}'
                 WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Atualização realizada com sucesso!",
            });
        });
    });
});

servidor.patch("/subtarefa/:id", (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    const QUERY = `UPDATE subtarefa
                   SET nomeSubtarefa = '${body.nome}',
                   statusSubtarefa = '${body.status}',
                   tarefa_id = '${body.tarefa}'
                   WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Atualização realizada com sucesso!",
            });
        });
    });
});

servidor.patch("/tarefa/status/:id", (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    const QUERY = `UPDATE tarefa
                 SET statusTarefa = '${body.status}'
                 WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Atualização realizada com sucesso!",
            });
        });
    });
});

servidor.patch("/subtarefa/status/:id", (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    const QUERY = `UPDATE subtarefa
                 SET statusSubtarefa = '${body.status}'
                 WHERE id=${id}`;

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor"
            });
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release();

            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                });
            }

            return res.status(200).send({
                Mensagem: "Atualização realizada com sucesso!",
            });
        });
    });
});

/*--------------- teste do servidor -------------*/

servidor.get("/testarconexao", (req, res, next) => {
    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Erro no servidor"
            });
        }

        conn.release();

        return res.status(200).send({
            Mensagem: "Conexão estabelecida com sucesso",
        });
    });
});

servidor.get("/", (req, res, next) => {
    return res.send({
        Mensagem: "Bem-vindo(a) ao servidor"
    });
});

servidor.listen(3000, () => {
    console.log("Servidor funcionando!");
});