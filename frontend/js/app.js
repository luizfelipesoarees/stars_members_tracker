const API_URL = "/api/members";

// DOM Elements
const addMemberForm = document.getElementById("add-member-form");
const membersContainer = document.getElementById("members-container");
let editingMemberId = null;

// Carregar membros ao iniciar
document.addEventListener("DOMContentLoaded", loadMembers);

// Enviar formulário
addMemberForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const member = {
        name: document.getElementById("name").value,
        rank: document.getElementById("rank").value,
        status: document.getElementById("status").value
    };

    try {
        const method = editingMemberId ? "PUT" : "POST";
        const url = editingMemberId ? `${API_URL}/${editingMemberId}` : API_URL;

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(member)
        });

        if (response.ok) {
            addMemberForm.reset();
            editingMemberId = null;
            loadMembers();
        }
    } catch (error) {
        console.error("Erro ao salvar membro:", error);
    }
});

// Carregar lista de membros
async function loadMembers() {
    try {
        const response = await fetch(API_URL);
        const members = await response.json();

        membersContainer.innerHTML = members.map(member => `
            <div class="member-card">
                <h3>${member.name}</h3>
                <p><strong>Patente:</strong> ${member.rank || "N/A"}</p>
                <p><strong>Status:</strong> ${translateStatus(member.status)}</p>
                <div class="button-group">
                    <button class="edit-btn" onclick="editMember(${member.id})">Editar</button>
                    <button class="delete-btn" onclick="deleteMember(${member.id})">Remover</button>
                </div>
            </div>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar membros:", error);
    }
}

// Traduzir status
function translateStatus(status) {
    const statusMap = {
        active: "Ativo",
        missing: "Desaparecido",
        deceased: "Falecido"
    };
    return statusMap[status] || status;
}

// Deletar membro
async function deleteMember(id) {
    if (confirm("Tem certeza que deseja remover este membro?")) {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            loadMembers();
        } catch (error) {
            console.error("Erro ao deletar membro:", error);
        }
    }
}

// Editar membro
async function editMember(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const member = await response.json();

        document.getElementById("name").value = member.name;
        document.getElementById("rank").value = member.rank;
        document.getElementById("status").value = member.status;

        editingMemberId = id;
    } catch (error) {
        console.error("Erro ao carregar membro para edição:", error);
    }
}
